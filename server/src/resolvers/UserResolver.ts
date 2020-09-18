import { MyContext } from '../types/MyContext';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import argon from 'argon2';
import { User } from '../entities/User';

@InputType()
class UsernamePasswordInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType()
class EmailPasswordInput {
  @Field()
  password: string;

  @Field()
  email: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.email.length < 2) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Email length must be 2 or more characters',
          },
        ],
      };
    }
    if (options.password.length < 3) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Email length must be 3 or more characters',
          },
        ],
      };
    }
    const hashedPassword = await argon.hash(options.password);
    const user = em.create(User, {
      name: options.name,
      email: options.email,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      console.error(`ERROR: ${error}`);
      if (error.code === '23505') {
        return {
          errors: [
            {
              field: 'email',
              message: 'User already exists',
            },
          ],
        };
      }
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options', () => EmailPasswordInput) options: EmailPasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOneOrFail(User, { email: options.email });
    if (!user) {
      return {
        errors: [{ field: 'email', message: "Email doesn't exist" }],
      };
    }
    const validPassword = await argon.verify(user.password, options.password);
    if (!validPassword) {
      return {
        errors: [{ field: 'password', message: 'Password is incorrect' }],
      };
    }
    req.session.userId = user.id;
    return { user };
  }
}

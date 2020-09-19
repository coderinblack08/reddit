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
import { EntityManager } from '@mikro-orm/postgresql';
import { cookie_name } from '../constants';

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
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.name.length < 2) {
      return {
        errors: [
          {
            field: 'name',
            message: 'Name length must be 2 or more characters',
          },
        ],
      };
    }
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
            field: 'password',
            message: 'Password length must be 3 or more characters',
          },
        ],
      };
    }
    const hashedPassword = await argon.hash(options.password);
    let user;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          name: options.name,
          email: options.email,
          password: hashedPassword,
          updated_at: new Date(),
          created_at: new Date(),
        })
        .returning('*');
      user = result[0];
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
    req.session.userId = user.id;
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

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((reslove) =>
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          reslove(false);
          return;
        }
        res.clearCookie(cookie_name);
        reslove(true);
      })
    );
  }
}

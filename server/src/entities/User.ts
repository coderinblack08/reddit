import { DateType, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: 'text' })
  name!: string;

  @Field()
  @Property({ unique: true })
  email!: string;

  @Property({ type: 'text' })
  password: string;

  @Field(() => String)
  @Property({ type: DateType })
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date(), type: DateType })
  updatedAt = new Date();
}

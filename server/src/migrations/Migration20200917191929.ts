import { Migration } from '@mikro-orm/migrations';

export class Migration20200917191929 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "name" text not null, "email" varchar(255) not null, "password" text not null, "created_at" date not null, "updated_at" date not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}

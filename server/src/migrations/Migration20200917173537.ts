import { Migration } from '@mikro-orm/migrations';

export class Migration20200917173537 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "title" text not null, "created_at" date not null, "updated_at" date not null);');
  }

}

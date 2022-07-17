import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1658033398702 implements MigrationInterface {
    name = "migrations1658033398702";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "background" character varying, "followingCount" integer NOT NULL DEFAULT '0', "followersCount" integer NOT NULL DEFAULT '0', "following_id" uuid array NOT NULL DEFAULT '{}', "followers_id" uuid array NOT NULL DEFAULT '{}', "about_me" character varying NOT NULL DEFAULT 'Nothing about me. :/', "liked_tweets_id" uuid array NOT NULL DEFAULT '{}', "liked_comments_id" uuid array NOT NULL DEFAULT '{}', "bookmarks_id" uuid array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "tweets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "author_id" uuid NOT NULL, "likes" integer NOT NULL DEFAULT '0', "liked_users_id" uuid array NOT NULL DEFAULT '{}', "image" character varying, "content" character varying NOT NULL, "comments_id" uuid array NOT NULL DEFAULT '{}', "isPublic" character varying NOT NULL DEFAULT 'true', "users_saved_id" uuid array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "author_id" uuid NOT NULL, "tweet_id" uuid NOT NULL, "comment" character varying NOT NULL, "likes" integer NOT NULL DEFAULT '0', "liked_users_id" uuid array NOT NULL DEFAULT '{}', "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "users_followers_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_ee8a9c5a097f32b484caaeb3de7" PRIMARY KEY ("usersId_1", "usersId_2"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_8d63f6043394b4d32343bdea11" ON "users_followers_users" ("usersId_1") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_1433e3275a501bc09f5c33c7ca" ON "users_followers_users" ("usersId_2") `,
        );
        await queryRunner.query(
            `CREATE TABLE "bookmarks_id" ("usersId" uuid NOT NULL, "tweetsId" uuid NOT NULL, CONSTRAINT "PK_cad3ea1526edb7d29af01af3433" PRIMARY KEY ("usersId", "tweetsId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_5acdf0659365c7a42c4402cf53" ON "bookmarks_id" ("usersId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_d0825f97db542abce671c1da48" ON "bookmarks_id" ("tweetsId") `,
        );
        await queryRunner.query(
            `ALTER TABLE "tweets" ADD CONSTRAINT "FK_6783f8d04acbff7ce2b2ee823f7" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "comments" ADD CONSTRAINT "FK_cdca270ba1f5105a09e64562fef" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "users_followers_users" ADD CONSTRAINT "FK_8d63f6043394b4d32343bdea11d" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "users_followers_users" ADD CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "bookmarks_id" ADD CONSTRAINT "FK_5acdf0659365c7a42c4402cf53f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "bookmarks_id" ADD CONSTRAINT "FK_d0825f97db542abce671c1da48c" FOREIGN KEY ("tweetsId") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "bookmarks_id" DROP CONSTRAINT "FK_d0825f97db542abce671c1da48c"`,
        );
        await queryRunner.query(
            `ALTER TABLE "bookmarks_id" DROP CONSTRAINT "FK_5acdf0659365c7a42c4402cf53f"`,
        );
        await queryRunner.query(
            `ALTER TABLE "users_followers_users" DROP CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2"`,
        );
        await queryRunner.query(
            `ALTER TABLE "users_followers_users" DROP CONSTRAINT "FK_8d63f6043394b4d32343bdea11d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "comments" DROP CONSTRAINT "FK_cdca270ba1f5105a09e64562fef"`,
        );
        await queryRunner.query(
            `ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`,
        );
        await queryRunner.query(
            `ALTER TABLE "tweets" DROP CONSTRAINT "FK_6783f8d04acbff7ce2b2ee823f7"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_d0825f97db542abce671c1da48"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_5acdf0659365c7a42c4402cf53"`,
        );
        await queryRunner.query(`DROP TABLE "bookmarks_id"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_1433e3275a501bc09f5c33c7ca"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_8d63f6043394b4d32343bdea11"`,
        );
        await queryRunner.query(`DROP TABLE "users_followers_users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "tweets"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}

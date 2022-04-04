import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1649097196725 implements MigrationInterface {
    name = "migrations1649097196725";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "avatar" character varying,
                "background" character varying,
                "following_id" uuid,
                "followers_id" uuid,
                "about_me" character varying NOT NULL DEFAULT '',
                "tweets_id" uuid,
                "liked_tweets_id" uuid,
                "comments_id" uuid,
                "liked_comments_id" uuid,
                "retweets_id" uuid,
                "bookmarks_id" uuid,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "author_id" uuid NOT NULL,
                "tweet_id" uuid NOT NULL,
                "comment" character varying NOT NULL,
                "likes" integer NOT NULL,
                "liked_users_id" uuid,
                "image" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tweets" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "author_id" uuid NOT NULL,
                "likes" integer NOT NULL,
                "liked_users_id" uuid,
                "retweets_id" uuid,
                "image" character varying NOT NULL,
                "comments_id" uuid,
                "public" boolean NOT NULL,
                "users_saved_id" uuid,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_cdca270ba1f5105a09e64562fef" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_6783f8d04acbff7ce2b2ee823f7" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_6783f8d04acbff7ce2b2ee823f7"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_cdca270ba1f5105a09e64562fef"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"
        `);
        await queryRunner.query(`
            DROP TABLE "tweets"
        `);
        await queryRunner.query(`
            DROP TABLE "comments"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }
}

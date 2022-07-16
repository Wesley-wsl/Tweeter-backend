import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1657832468671 implements MigrationInterface {
    name = "migrations1657832468671";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN "retweets_id"`,
        );
        await queryRunner.query(
            `ALTER TABLE "tweets" DROP COLUMN "retweets_id"`,
        );
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "tweet_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "tweet_id" uuid`);
        await queryRunner.query(
            `ALTER TABLE "tweets" ADD "retweets_id" uuid array NOT NULL DEFAULT '{}'`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ADD "retweets_id" uuid array NOT NULL DEFAULT '{}'`,
        );
    }
}

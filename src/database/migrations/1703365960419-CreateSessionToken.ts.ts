import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSessionToken1703365960419 implements MigrationInterface {
  name = 'CreateSessionToken1703365960419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session_token" (
        "id" integer NOT NULL,
        "name" character varying,
        "email" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "userId" integer)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "session_token"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1652043456184 implements MigrationInterface {
  name = 'SeedDB1652043456184';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO tags (name) VALUES ('take'), ('my'), ('stuff')
      `,
    );
    // pw: 123
    await queryRunner.query(
      `
        INSERT INTO users (username, email, password)
        VALUES ('uzver', 'uz@zver.com', '$2b$10$yAwFIzGWfeXja2jYBmI8T.dUICA5og8nopfEpXUFN8dKM6UNiZ8cu')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}

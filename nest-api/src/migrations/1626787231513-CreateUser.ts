import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1626787231513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password_hash',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
         ],
       }),
      );   
    }
       
    public async down(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.dropTable('users');
    }

}


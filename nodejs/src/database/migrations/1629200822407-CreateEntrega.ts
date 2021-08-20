
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEntrega1629200822407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
      new Table({
        name: 'entregas',
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
            name: 'destinatario',
            type: 'varchar',
          },
          {
            name: 'taxa',
            type: 'double precision',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'dataPedido',
            type: 'timestamp',
          },
	  {
            name: 'dataFinalizacao',
            type: 'timestamp',
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
        await queryRunner.dropTable('entregas');

    }

}


//      await queryRunner.createForeignKey(
//      'user_entrega',
//      new TableForeignKey({
//        name: 'order_items_product_id_foreign_key',
//        columnNames: ['user_id'],
//        referencedColumnNames: ['id'],
//        referencedTableName: 'users',
//      }),

//  public async down(queryRunner: QueryRunner): Promise<void> {
//    await queryRunner.dropForeignKey(
//      'order_items',
//      'order_items_product_id_foreign_key',
//    );
//    await queryRunner.dropForeignKey(
//      'order_items',
//      'order_items_order_id_foreign_key',
//   );
//  }
// }

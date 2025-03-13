import { BaseSchema } from '@adonisjs/lucid/schema'


export default class AddCompanyIdToEmployees extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('companyId').unsigned().references('id').inTable('companies').onDelete('SET NULL')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('companyId')
    })
  }
}

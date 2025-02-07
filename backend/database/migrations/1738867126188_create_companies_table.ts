import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('siret', 14).notNullable().unique()
      table.string('address', 255).notNullable()
      table.string('form', 100).notNullable()
      table.string('phone', 20).notNullable()
      table.string('website', 255).nullable()
      table.string('sector', 255).notNullable()
      table.date('created').notNullable()
      table.string('status', 50).notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

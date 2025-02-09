import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE')
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email').unique().notNullable()
      table.string('phone_number')
      table.string('address')
      table.string('position').nullable()
      table.date('hired_at')
      table.date('fired_at').nullable()
      table.string('type').notNullable()
      table.decimal('salary', 10, 2).notNullable()
      table.integer('hour_per_month').notNullable()
      table.string('status').nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

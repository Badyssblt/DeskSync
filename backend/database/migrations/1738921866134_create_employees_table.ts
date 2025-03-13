import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('firstname')
      table.string('lastname')
      table.string('email')
      table.string('phone_number')
      table.string('address')
      table.string('position')
      table.date('hired_at')
      table.date('fired_at')
      table.string('type')
      table.integer('salary')
      table.integer('hour_per_month')
      table.string('status')

      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE')

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}


async down() {
    this.schema.dropTable(this.tableName)
  }
}

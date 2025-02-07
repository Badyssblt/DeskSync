import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Company from "#models/company";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Company)
  declare company: HasOne<typeof Company>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

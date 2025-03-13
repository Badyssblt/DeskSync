import { DateTime } from 'luxon'
import {BaseModel, column, belongsTo, hasMany} from '@adonisjs/lucid/orm'
import User from "#models/user";
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Employee from "#models/employee";

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare siret: number;

  @column()
  declare address: string

  @column()
  declare form: string;

  @column()
  declare phone: string;

  @column()
  declare website: string;

  @column()
  declare sector: string;

  @column.date()
  declare created: DateTime;

  @column()
  declare status: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>;


  @column()
  declare userId: number;

  // @ts-ignore
  @hasMany(() => Employee)
  declare employees: typeof Employee
}

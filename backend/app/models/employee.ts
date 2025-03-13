import { DateTime } from 'luxon'
import {BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import type {BelongsTo} from '@adonisjs/lucid/types/relations'
import Company from "#models/company";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @column()
  declare companyId: number

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column()
  declare phoneNumber: string

  @column()
  declare address: string

  @column(
    {
      prepare: (value: string | null)=> {
        value?.toLowerCase()
      }
    }
  )
  declare position: string

  @column.date()
  declare hiredAt: DateTime

  @column.date()
  declare firedAt: DateTime

  @column()
  declare type: string

  @column()
  declare salary: number

  @column()
  declare hourPerMonth: number

  @column({
    prepare: (value: string | null)=> {
      value?.toLowerCase()
    }
  })
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

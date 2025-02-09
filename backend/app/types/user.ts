import { DateTime } from 'luxon'

export interface userPayload {
  firstname: string;
  lastname: string;
  email: string
}

export interface user extends userPayload {
  id: number
  createdAt: DateTime
  updatedAt: DateTime
}

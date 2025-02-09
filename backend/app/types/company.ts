import { DateTime } from 'luxon'

export interface CompanyPayload {
  name: string
  email: string
  siret: number
  address: string
  form: string
  phone: string
  website: string
  sector: string
  status: string
  user: number
}

export interface Company extends CompanyPayload {
  id: number
  created: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}

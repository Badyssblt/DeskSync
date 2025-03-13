import { DateTime } from 'luxon'

export interface EmployeePayload {
  firstname: string
  lastname: string
  email: string
  phoneNumber: string
  address: string
  position: string
  hiredAt: DateTime
  firedAt?: DateTime
  type: string
  salary: number
  hourPerMonth: number
  status: string
  company: number
}

export interface Employee extends EmployeePayload {
  id: number
  createdAt: DateTime
  updatedAt: DateTime
}

// @ts-ignore
import { Employee, EmployeePayload } from '#types/employee'
import EmployeeModel from '#models/employee'
import Company from "#models/company";

export default class EmployeeService {
  public async create(employeeData: EmployeePayload) {
    try {
      const company = await Company.findOrFail(employeeData.companyId);
      const employee = await company.related('employees').create(employeeData)

      return employee as Employee
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async readOne(employeeId: number): Promise<Employee | null> {
    try {
      const employee = await EmployeeModel.find(employeeId)
      return employee as Employee | null
    } catch (error) {
      throw new Error('Erreur lors de la lecture de l\'employé')
    }
  }

  public async readAll(companyId: number) {
    try {
      return await EmployeeModel.query().where('company_id', companyId)
    } catch (error) {
      throw new Error('Erreur lors de la lecture des employés')
    }
  }

  public async update(employeeId: number, employeeData: Partial<EmployeePayload>): Promise<Employee> {
    try {
      const employee = await EmployeeModel.find(employeeId)
      if (!employee) {
        throw new Error('Employé non trouvé')
      }

      employee.merge(employeeData)
      await employee.save()

      return employee as Employee
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de l\'employé')
    }
  }

  public async delete(employeeId: number): Promise<void> {
    try {
      const employee = await EmployeeModel.find(employeeId)
      if (!employee) {
        throw new Error('Employé non trouvé')
      }

      await employee.delete()
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'employé')
    }
  }

}

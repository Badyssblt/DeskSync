import {inject} from "@adonisjs/core";
import {HttpContext} from "@adonisjs/core/http";
import EmployeeService from "#services/employee_service";
import {isOwnerCompany} from "#abilities/main";
import Company from "#models/company"; // Assuming you have an ability check for employees

export default class EmployeesController {

  @inject()
  async create({ request, auth }: HttpContext, employeeService: EmployeeService) {
    let data = request.body();

    return await employeeService.create(data);
  }



  @inject()
  async readOne({ params, bouncer, response }: HttpContext, employeeService: EmployeeService) {
    const employee = await employeeService.readOne(params.id);
    const company = await Company.findOrFail(employee.companyId)

    if (await bouncer.allows(isOwnerCompany, company)) {
      return employee;
    }

    return response.forbidden("Vous n'avez pas accès à ceci");
  }

  @inject()
  async update({ params, request, bouncer, response }: HttpContext, employeeService: EmployeeService) {
    const employee = await employeeService.readOne(params.id);
    const company = await Company.findOrFail(employee.companyId)

    if (await bouncer.allows(isOwnerCompany, company)) {
      return await employeeService.update(params.id, request.body());
    }

    return response.forbidden("Vous n'avez pas accès à ceci");
  }

  @inject()
  async delete({ params, bouncer, response }: HttpContext, employeeService: EmployeeService) {
    const employee = await employeeService.readOne(params.id);
    const company = await Company.findOrFail(employee.companyId)

    if (await bouncer.allows(isOwnerCompany, company)) {
      return await employeeService.delete(params.id);
    }

    return response.forbidden("Vous n'avez pas accès à ceci");
  }
}


import {HttpContext} from "@adonisjs/core/http";
import CompanyService from "#services/company_service";
import {inject} from "@adonisjs/core";
import Company from "#models/company";

export default class CompaniesController {

  @inject()
  async create({ request, auth}: HttpContext, companyService: CompanyService){
    let data = request.body();
    const user = auth.user;


    data.user_id = user?.id


    await companyService.create(data)
  }
}

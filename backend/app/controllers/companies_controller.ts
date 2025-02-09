
import {HttpContext} from "@adonisjs/core/http";
import CompanyService from "#services/company_service";
import {inject} from "@adonisjs/core";
import {isOwnerCompany} from "#abilities/main";
import {user} from "../types/user.js";

export default class CompaniesController {

  @inject()
  async create({ request, auth}: HttpContext, companyService: CompanyService){
    let data = request.body();
    const user = auth.user;


    data.user_id = user?.id

    await companyService.create(data)
  }

  @inject()
  async readAll({ auth }: HttpContext, companyService: CompanyService){
    const user = auth.user;

    return await companyService.readAll(user);
  }

  @inject()
  async readOne({ params, bouncer, response }: HttpContext, companyService: CompanyService){
    const company = await companyService.readOne(params.id);

    if(await bouncer.allows(isOwnerCompany, company)){
      return company;
    }

    return response.forbidden("Vous n'avez pas accès à ceci")

  }

  @inject()
  async update({ params, request, bouncer, response }: HttpContext, companyService: CompanyService){
    const companyCheck = await companyService.readOne(params.id);

    if(await bouncer.allows(isOwnerCompany, companyCheck)){
      return await companyService.update(params.id, request.body());

    }

    return response.forbidden("Vous n'avez pas accès à ceci")

  }

  @inject()
  async delete({ params, bouncer, response }: HttpContext, companyService: CompanyService){
    const companyCheck = await companyService.readOne(params.id);

    if(await bouncer.allows(isOwnerCompany, companyCheck)){
      return await companyService.delete(params.id);
    }

    return response.forbidden("Vous n'avez pas accès à ceci")
  }


}

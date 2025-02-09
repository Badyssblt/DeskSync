// @ts-ignore
import {Company, CompanyPayload} from '#types/company'
import CompanyModel from '#models/company'
import {user} from "../types/user.js";

export default class CompanyService {
  public async create(companyData: CompanyPayload) {
    try {
      const company = await CompanyModel.create(companyData)
      return company as Company
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async readOne(companyId: number): Promise<Company | null> {
    try {
      const company = await CompanyModel.find(companyId)
      return company as Company | null
    } catch (error) {
      throw new Error('Erreur lors de la lecture de la compagnie')
    }
  }

  public async readAll(user: user) {
    try {
      return await CompanyModel.query().where('user_id', user.id);
    } catch (error) {
      throw new Error('Erreur lors de la lecture des compagnies')
    }
  }

  public async update(companyId: number, companyData: Partial<CompanyPayload>): Promise<Company> {
    try {
      const company = await CompanyModel.find(companyId)
      if (!company) {
        throw new Error('Compagnie non trouvée')
      }

      company.merge(companyData)
      await company.save()

      return company as Company
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la compagnie')
    }
  }

  public async delete(companyId: number): Promise<void> {
    try {
      const company = await CompanyModel.find(companyId)
      if (!company) {
        throw new Error('Compagnie non trouvée')
      }

      await company.delete()
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la compagnie')
    }
  }
}

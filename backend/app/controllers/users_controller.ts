import type { HttpContext } from '@adonisjs/core/http'
import userService from "#services/user_service"
import {inject} from "@adonisjs/core";

export default class UsersController {
  @inject()
  register({ request }: HttpContext, userService: userService) {
    return userService.register(request.body());
  }

  @inject()
  login({ request }: HttpContext, userService: userService) {
    return userService.login(request.body());
  }
}

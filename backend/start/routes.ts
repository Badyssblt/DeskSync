/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from "#controllers/users_controller";
import CompaniesController from "#controllers/companies_controller";
import {middleware} from "#start/kernel";

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [UsersController, 'register']);
router.post('/login', [UsersController, 'login']);


// Company
router.group(() => {
  router.post('company', [CompaniesController, 'create'])
})
  .use(middleware.auth({
    guards: ['api']
  }))
  .prefix('/api')

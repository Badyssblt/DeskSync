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
import EmployeesController from "#controllers/employees_controller";


router.post('/register', [UsersController, 'register']);
router.post('/login', [UsersController, 'login']);


// Company
router.group(() => {
  router.post('company', [CompaniesController, 'create'])
  router.get('companies', [CompaniesController, 'readAll'])
  router.get('company/:id', [CompaniesController, 'readOne'])
  router.patch('company/:id', [CompaniesController, 'update'])
  router.delete('company/:id', [CompaniesController, 'delete'])
})
  .use(middleware.auth({
    guards: ['api']
  }))
  .prefix('/api')


// Employee
router.group(() => {
  router.post('employee', [EmployeesController, 'create'])
  router.get('employee/:id', [EmployeesController, 'readOne'])
  router.patch('employee/:id', [EmployeesController, 'update'])
  router.delete('employee/:id', [EmployeesController, 'delete'])
})
  .use(middleware.auth({
    guards: ['api']
  }))
  .prefix('/api')

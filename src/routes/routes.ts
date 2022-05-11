import { Router } from 'express';
import { privateRoute } from '../config/passport';

import * as EmployeesController from '../controllers/employeesController';

import * as PatientsController from '../controllers/patientsController';

const router = Router();

router.post('/register-employees', EmployeesController.registerEmployees);
router.post('/login-employees', EmployeesController.loginEmployees);


router.post('/register-patients', privateRoute, PatientsController.createPatients) //criar autenticação para somente funcionario logado


export default router;
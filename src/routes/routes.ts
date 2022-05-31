import { Router } from 'express';
import { privateRoute } from '../config/passport';

import * as EmployeesController from '../controllers/employeesController';

import * as PatientsController from '../controllers/patientsController';

const router = Router();

router.post('/register/employees', EmployeesController.registerEmployees);
router.post('/login/employees', EmployeesController.loginEmployees);

router.post('/register/patients', privateRoute, PatientsController.createPatients)

router.get('/list/patients', privateRoute, PatientsController.listPatients)
router.get('/list/patients/:id', privateRoute, PatientsController.patientX)


router.put('/update/:id/patients', privateRoute, PatientsController.updatePatients) 


export default router;
import { Router } from 'express';
import { privateRouteMaster, privateRouteOrdinary } from '../config/passport';

import * as EmployeesController from '../controllers/employeesController';

import * as PatientsController from '../controllers/patientsController';

const router = Router();

router.post('/register/employees', EmployeesController.registerEmployees);
router.post('/login/employees', EmployeesController.loginEmployees);

router.get('/list/patients', privateRouteOrdinary, PatientsController.listPatients)
router.get('/list/patients/:id', privateRouteOrdinary, PatientsController.patientX)
router.get('/filter/patients/:status', privateRouteOrdinary, PatientsController.statusFilter)
router.get('/filter/:patient', privateRouteOrdinary, PatientsController.patientFilter)

router.post('/register/patients', privateRouteOrdinary, PatientsController.createPatients)
router.put('/update/:id/patients', privateRouteOrdinary, PatientsController.updatePatients)
router.delete('/delete/:id/patients', privateRouteMaster, PatientsController.deletePatients)

export default router;
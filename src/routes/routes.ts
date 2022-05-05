import { Router } from 'express';

import * as ApiController from '../controllers/employeesController';

const router = Router();

router.post('/register-employees', ApiController.registerEmployees);
router.post('/login-employees', ApiController.loginEmployees);





export default router;
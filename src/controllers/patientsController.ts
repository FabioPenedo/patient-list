import { Request, Response } from 'express';
import * as UserService from '../services/PatientsService';

export const createPatients = async (req: Request, res: Response) => {
    
    res.json({ status: true })
}
import { Request, Response } from 'express';
import * as UserService from '../services/PatientsService';

export const createPatients = async (req: Request, res: Response) => {
    if(req.body.status && req.body.cpf && req.body.patient) {

        let { patient, gender, clinic, age, city, cpf, rg, cep, status } = req.body;

        const newUser = await UserService.registerPatient(patient, gender, clinic, age, city, cpf, rg, cep, status)

        if(newUser instanceof Error) {
            res.json({ error: newUser.message });
            return;
        } else {
            res.status(201);
            res.json({ id: newUser.id });
            return;
        }
    }

    res.json({ error: 'Dados do paciente não enviados.' });
}
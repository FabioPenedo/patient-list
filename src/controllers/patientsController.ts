import { Request, Response } from 'express';
import * as PatientService from '../services/PatientsService';
import * as StatusHistory from '../services/StatusHistoryService';
import { decodeToken } from '../config/passport';


export const createPatients = async (req: Request, res: Response) => {
    if(req.body.status && req.body.cpf && req.body.patient) {

        let { patient, gender, clinic, age, city, cpf, rg, cep, status } = req.body;

        const newUser = await PatientService.registerPatient(patient, gender, clinic, age, city, cpf, rg, cep, status)

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

export const listPatients = async (req: Request, res: Response) => {
    let users = await PatientService.all()
    res.json({ users });
}

export const patientX = async (req: Request, res: Response) => {
    let id = parseInt( req.params.id )
    let users = await PatientService.thisPatient( id )
    res.json({ users });
}

export const updatePatients = async (req: Request, res: Response) => {
    let id = parseInt( req.params.id )

    let patientX = await PatientService.thisPatient(id)
    if(patientX) {
        let previousStatus
        
        let { patient, gender, clinic, age, city, cpf, rg, cep, status } = req.body;
        let user = await PatientService.updateThisPatient(id, patient, gender, clinic, age, city, cpf, rg, cep, status)
        res.json({ user })
    
        let token = req.headers.authorization as string
        let separateToken = token.split(' ')
        let decode = decodeToken(separateToken[1])
        
        if(req.body.status) {
            if(user) {
                let employeeId = decode.id
                let patientId =  user.id
                previousStatus = patientX.status
                let currentStatus = user.status
                let now = new Date()
                let dataTime = now.toLocaleString() 
    
                await StatusHistory.employeeRegistration(employeeId, patientId, previousStatus, currentStatus, dataTime)
            }
        }
    } else {
        res.json({ users: null })
    }
     
}

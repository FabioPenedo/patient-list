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
};

export const listPatients = async (req: Request, res: Response) => {
    let users = await PatientService.all()
    res.json({ users });
};

export const patientX = async (req: Request, res: Response) => {
    let id = parseInt( req.params.id )
    let users = await PatientService.thisPatient( id )
    res.json({ users });
};

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

                const now = new Date()
                let day = now.getDate()
                let month = now.getMonth()
                let year = now.getFullYear().toString().slice(-2)
                let hour = now.getHours()
                let minutes = now.getMinutes()
                let dataTime = `0${day}-0${month}-${year} ${hour}:${minutes}`
                
                await StatusHistory.employeeRegistration(employeeId, patientId, previousStatus, currentStatus, dataTime)
            }
        }
    } else {
        res.json({ users: null })
    }  
};

export const deletePatients = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)
    await PatientService.deletePatient(id)
    res.json({ user: true })
};

export const statusFilter = async (req: Request, res: Response) => {
    let status = req.params.status
    let user = await PatientService.findPatientsStatus(status)
    res.json({ user })
};

export const patientFilter = async (req: Request, res: Response) => {
    let patient = req.params.patient
    let user = await PatientService.findPatient(patient)
    res.json({ user })
};

export const dataTimeFilter = async (req: Request, res: Response) => {
    let datatime = req.params.datatime
    let user = await StatusHistory.findDataTime(datatime)
    res.json({ user })
};



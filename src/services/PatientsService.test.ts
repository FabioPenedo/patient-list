import { UserPatients, UserInstance } from '../models/Patients';
import * as PatientsService from './PatientsService';

describe('testing patients service', () => {

    let patient = 'penedo'
    let gender = 'masculino'
    let clinic = 'hospitalPenedo'
    let age = '22'
    let city = 'bh'
    let cpf = '000.000.000-00'
    let rg = 'mg-000.00'
    let cep = '00.000-000'
    let status = 'ativo'


    beforeAll(async () => {
        await UserPatients.sync({ force: true })
    });

    it('should create a new patients', async () => {
        const newUser = await PatientsService.registerPatient(patient, gender, clinic, age, city, cpf, rg, cep, status) as UserInstance
        expect(newUser).not.toBeInstanceOf(Error)
        expect(newUser).toHaveProperty('id')
        expect(newUser.status).toBe('ativo')
    });

    it('should not allow to create a patient with existing cpf', async () => {
        const newUser = await PatientsService.registerPatient(patient, gender, clinic, age, city, cpf, rg, cep, status);
        expect(newUser).toBeInstanceOf(Error);
    });
    
});
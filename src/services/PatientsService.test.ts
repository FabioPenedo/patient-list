import { UserPatients, UserInstance } from '../models/Patients';
import * as PatientsService from './PatientsService';

describe('testing patients service', () => {

    let id = 1
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

    it('should list all patients', async () => {
        const users = await PatientsService.all()
        expect(users.length).toBeGreaterThanOrEqual(1)
        for(let i in users) {
            expect(users[i]).toBeInstanceOf(UserPatients)
        } 
    });

    it('should list patient by id', async () => {
        const user = await PatientsService.thisPatient(id) as UserInstance
        expect(user.id).toBe(id)
        expect(user).toHaveProperty('id');
        expect(user).not.toBeNull()
    });


    it('should update this patients', async () => {
        const updateUser = await PatientsService.updateThisPatient(id, patient, gender, clinic, age, city, cpf, rg, cep, status) as UserInstance
        expect(updateUser.id).toBe(id)
        expect(updateUser).not.toBeInstanceOf(Error)
        expect(updateUser).not.toBeNull()
    });
    
});
import { UserInstance, UserPatients } from '../models/Patients';
import { Op } from 'sequelize';

export const registerPatient = async (patient: string, gender: string, clinic: string, age: string, city: string, cpf: string, rg: string, cep: string, status: string) => {
    const hasUser = await UserPatients.findOne({where: { cpf } });
    if(!hasUser){
        const newUser = await UserPatients.create({
            patient,
            gender,
            clinic,
            age,
            city,
            cpf,
            rg,
            cep,
            status: 'ativo'
        });
        return newUser;
    }else {
        return new Error('Já existe um usuário com esse cpf cadastrado');
    }
};

export const all = async () => {
    return await UserPatients.findAll();
};

export const thisPatient = async (id: number) => {
    return await UserPatients.findByPk(id);   
};

export const updateThisPatient = async (id: number, patient: string, gender: string, clinic: string, age: string, city: string, cpf: string, rg: string, cep: string, status: string) => {
    const userResults = await UserPatients.findAll({where: { id }}) 
    
    if(userResults.length > 0) {
        let userEdit = userResults[0]
        userEdit.patient = patient
        userEdit.gender = gender
        userEdit.clinic = clinic
        userEdit.age = age
        userEdit.city = city
        userEdit.cpf = cpf
        userEdit.rg = rg
        userEdit.cep = cep
        userEdit.status = status
        return await userEdit.save()
    }
};

export const deletePatient = async (id: number) => {
    return await UserPatients.destroy({where: { id }});   
};

export const findPatientsStatus = async (status: string) => {
    return await UserPatients.findAll({
        where: { status }
    })
};

export const findPatient = async (patient: string) => {
    return await UserPatients.findAll({
        where: {
            patient: {
                [Op.like]: `${patient}%`
            }
        }
    });
};
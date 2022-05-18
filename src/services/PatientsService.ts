import { UserPatients } from '../models/Patients';

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
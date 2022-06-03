import { UserEmployees } from '../models/Employees';
import bcrypt from 'bcrypt';

export const createEmployees = async (email: string, password: string) => {
    const hasUser = await UserEmployees.findOne({where: { email } });
    if(!hasUser){
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await UserEmployees.create({
            email,
            password: hash,
            usertype: 'ordinary'
        });
        return newUser;
    }else {
        return new Error('Email já existe');
    }
};

export const findByEmail = async (email: string) => {
    return await UserEmployees.findOne({where: { email } });
};

export const matchPassword = async (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted);
};

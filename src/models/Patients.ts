import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    id: number;
    patient: string;
    clinic: string;
    age: string;
    city: string;
    cpf: string;
    rg: string;
    cep: string;
    gender: string;
    status: string;
}

export const UserPatients = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    patient: {
        type: DataTypes.STRING
    },
    gender : {
        type: DataTypes.STRING,
    },
    clinic: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING,
        unique: true
    },
    rg: {
        type: DataTypes.STRING,
        unique: true
    },
    cep: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'patients',
    timestamps: false
});
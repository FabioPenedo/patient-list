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
    status: string;
    employeeid: number;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    patient: {
        type: DataTypes.STRING,
        unique: true
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
        type: DataTypes.STRING
    },
    rg: {
        type: DataTypes.STRING
    },
    cep: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    employeeid: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'patients',
    timestamps: false
});
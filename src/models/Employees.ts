import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    id: number;
    email: string;
    password: string;
    usertype: string;
}

export const UserEmployees = sequelize.define<UserInstance>('UserEmployees', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    usertype: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'employees',
    timestamps: false
});
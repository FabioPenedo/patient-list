import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    idemployees: number;
    idpatient: number;
    previousstatus: string;
    currentstatus: string;
    datatime: number;
}

export const StatusHistory = sequelize.define<UserInstance>('StatusHistory', {
    idemployees: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idpatient: {
        type: DataTypes.INTEGER
    },
    password: {
        type: DataTypes.STRING
    },
    usertype: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'statushistory',
    timestamps: false
});
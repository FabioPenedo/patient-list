import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    id: number;
    idemployees: number;
    idpatient: number;
    previousstatus: string;
    currentstatus: string;
    datatime: string;
}

export const StatusHistory = sequelize.define<UserInstance>('StatusHistory', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    idemployees: {
        type: DataTypes.INTEGER
    },
    idpatient: {
        type: DataTypes.INTEGER
    },
    previousstatus: {
        type: DataTypes.STRING
    },
    currentstatus: {
        type: DataTypes.STRING
    },
    datatime: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'statushistory',
    timestamps: false
});
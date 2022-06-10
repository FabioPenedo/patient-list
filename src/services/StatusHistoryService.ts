import { UserInstance, StatusHistory } from '../models/StatusHistory';
import { Op } from 'sequelize';

export const employeeRegistration = async (employeeId: number, patientId: number, previousStatus: string, currentStatus: string, dataTime: string) => {
    await StatusHistory.create({
        idemployees: employeeId,
        idpatient: patientId,
        previousstatus: previousStatus,
        currentstatus: currentStatus,
        datatime: dataTime
    });
}

export const findDataTime = async (datatime: string) => {
    return await StatusHistory.findAll({
        where: {
            datatime: {
                [Op.like]: `${datatime}%`
            }
        }
    });
}

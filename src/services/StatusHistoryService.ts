import { UserInstance, StatusHistory } from '../models/StatusHistory';
import { UserPatients } from '../models/Patients';

export const employeeRegistration = async (employeeId: number, patientId: number, previousStatus: string, currentStatus: string, dataTime: string) => {
    await StatusHistory.create({
        idemployees: employeeId,
        idpatient: patientId,
        previousstatus: previousStatus,
        currentstatus: currentStatus,
        datatime: dataTime
    });
}

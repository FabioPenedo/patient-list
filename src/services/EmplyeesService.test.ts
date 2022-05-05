import { UserEmployees, UserInstance } from '../models/Employees';
import * as EmployeesService from './EmployeesService';

describe('testing employees service', () => {

    let email = 'teste@jest.com';
    let password = '1234';

    beforeAll(async () => {
        await UserEmployees.sync({ force: true })
    });

    it('should create a new user', async () => {
        const newUser = await EmployeesService.createEmployees(email, password) as UserInstance;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('id');
        expect(newUser.email).toBe(email)
    });

    it('should not allow to create a user with existing email', async () => {
        const newUser = await EmployeesService.createEmployees(email, password);
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should find a user by the email', async () => {
        const user = await EmployeesService.findByEmail(email) as UserInstance;
        expect(user.email).toBe(email)
    });

    it('should match the password from database', async () => {
        const user = await EmployeesService.findByEmail(email) as UserInstance;
        const match = await EmployeesService.matchPassword(password, user.password)
        expect(match).toBeTruthy()
    });

    it('should not match the password from database', async () => {
        const user = await EmployeesService.findByEmail(email) as UserInstance;
        const match = await EmployeesService.matchPassword('invalid', user.password)
        expect(match).toBeFalsy()
    });

});
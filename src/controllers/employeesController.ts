import { Request, Response } from 'express';
import * as UserService from '../services/EmployeesService';
import { generateToken } from '../config/passport';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
};

export const registerEmployees = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;

        const newUser = await UserService.createEmployees(email, password);

        if(newUser instanceof Error) {
            res.json({ error: newUser.message });
            return;
        } else {
            res.status(201);
            res.json({ id: newUser.id });
            return;
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
};

export const loginEmployees = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        const user = await UserService.findByEmail(email);

        if(user && UserService.matchPassword(password, user.password)) {
            const token = generateToken({id: user.id})
            res.json({ status: true, token });
            return;
        }
    }

    res.json({ status: false });
};

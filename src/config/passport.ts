import { Request, Response, NextFunction} from 'express';
import passport from "passport";
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { UserEmployees } from '../models/Employees';

dotenv.config();

const notAuthorizedJson = { json: 401, message: 'Não Autorizado!' }

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await UserEmployees.findByPk(payload.id)
    return user ? done(null, user) : done(notAuthorizedJson, false);
}));

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string);
}

export const decodeToken = (token: string) => {
    return jwt.decode(token) as JwtPayload
}

export const privateRouteOrdinary = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt', (err, user) => {
        req.user = user
        return user ? next() : next(notAuthorizedJson)
    });
    authFunction(req, res, next)
}

export const privateRouteMaster = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt', (err, user) => {
        req.user = user
        if(user.usertype === 'master') {
            next()
            return;
        } else {
            next(notAuthorizedJson)
            return;
        }
    });
    authFunction(req, res, next)
}

export default passport;
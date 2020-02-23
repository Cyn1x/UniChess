import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../../models/user/user';

const authRoute: Router = express.Router();

authRoute.post('/register', async (req: Request, res: Response) => {
    if (await emailExists(req.body.email)) { return res.status(400).send('Email address already exists'); }

    const user = await createUser(req);
    try {
        const savedUser = await user.save();
        res.send({ savedUser: savedUser._id });
    }
    catch(err) { res.status(400).send(err); }
})

authRoute.post('/login', async (req: Request, res: Response) => {
    const user = await emailExists(req.body.email);
    if (!user) { return res.status(400).send('Email address is not registered'); }

    const pass = await validPassword(req.body.password, user.password);
    if (!pass) { return res.status(400).send('Invalid password'); }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN as Secret);
    res.header('auth-token', token).send(token);
})

const emailExists = async (email: string) => { return await User.findOne({ email: email }); }

const validPassword = async (stored: string, given: string) => { return bcrypt.compare(stored, given) }

const createUser = async (req: Request) => {
    return new User({
        username: req.body.username,
        university: req.body.university,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        date: req.body.date
    });
}

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export default authRoute;

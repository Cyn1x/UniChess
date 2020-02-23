import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const authVerify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) { return res.status(400).send('Access denied'); }

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN as Secret);
        console.log(verified);
        next();
    }
    catch { res.status(400).send('Invalid token'); }
}

export default authVerify;

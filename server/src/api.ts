import { Application } from "express";

import authRoute from './routes/auth/auth';
import authVerify from './routes/verify/verify';

const initialiseAPI = (app: Application) => {
    app.use('/api/user', authRoute);
}

export default initialiseAPI;

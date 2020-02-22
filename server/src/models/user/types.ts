import { Schema, Document } from 'mongoose';

export interface IUserSchema extends Document {
    username: string;
    university: string;
    email: string;
    password: string;
    date: string;
}

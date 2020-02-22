import mongoose from 'mongoose';
import { IUserSchema } from './types';
import User from './user';

describe('User model', () => {
    it('Should throw validation errors', () => {
        const user: IUserSchema = new User();
        
        expect(user.validate).toThrow();
    });
    
    it('Should save a user', async () => {
        expect.assertions(3);
        
        const user: IUserSchema = new User({
            username: 'username1',
            university: 'University of New England',
            email: 'test@example.com',
            password: 'password123',
            date: Date
        });
        const spy = jest.spyOn(user, 'save');
        user.save();
        
        expect(spy).toHaveBeenCalled();
        
        expect(user).toMatchObject({
            username: expect.any(String),
            university: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            date: expect.any(Date)
        });
        
        expect(user.email).toBe('test@example.com');
    });
});

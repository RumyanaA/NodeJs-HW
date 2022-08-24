import User from '../models/userModel.js';
import { getUser, loginUser } from '../services/userServices.js';

describe('user flow', () => {
    it('should generate and return token on login', async () => {
        const token = await loginUser('felix', 'felix12');
        expect(typeof token).toBe('string');
    });

    it('should return error message on login', async () => {
        const data = await loginUser('felix', 'wrongPassword');
        expect(data).toBe('username or password is incorrect');
    });

    it('should return user data on getUser', async () => {
        const user = await getUser('user60');
        expect(user).toBeInstanceOf(User);
    });

    it('should return error message when wrong data is passed on getUser', async () => {
        const data = await getUser('wrongId');
        expect(data).toBe(null);
    });
});


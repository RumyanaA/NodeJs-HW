import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import userRoutes from '../users';
import { hardDeleteUser }  from '../../utilities/deleteMockedData';

const app = new express();
app.use(express.json());
app.use('/', userRoutes);

let mockUser;
beforeEach(() => {
    mockUser = {
        id: 'mockUserID',
        login: 'mockUserName',
        password: 'mockUserPassword',
        age: 16,
        isDeleted: false
    };
});


afterAll(() => {
    hardDeleteUser(mockUser.id);
});

describe('register route', () => {
    it('should return status code 204 on /user route', (done) => {
        request(app)
            .post('/user')
            .send(mockUser)
            .set('Accept', 'application/json')
            .expect(204, done);
    });

    it('should return status code 400', (done) => {
        mockUser.age = 1;
        request(app)
            .post('/user')
            .send(mockUser)
            .set('Accept', 'application/json')
            .expect(400, done);
    });
});

describe('login route', () => {
    it('should return status code 200', (done) => {
        request(app)
            .post('/login')
            .send({
                username: mockUser.login,
                password: mockUser.password
            })
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('should return status code 500 and error message', (done) => {
        request(app)
            .post('/login')
            .send({
                login: 'invalidName',
                password: 'invalidPassword'
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});


describe('authentication and get user by id', () => {
    it('should authenticate and get user61', (done) => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('Some decoded token');
        request(app)
            .get(`/user/${mockUser.id}`)
            .set('auth_token', 'somerandomjwttoken')
            .set('Accept', 'application/json')
            .expect(
                200,
                mockUser,
                done
            );
    });

    it('should fail to authenticate and return status code 401', (done) => {
        request(app)
            .get(`/user/${mockUser.id}`)
            .set('Accept', 'application/json')
            .expect(401, '{"success":false,"message":"No token provided."}', done);
    });
});

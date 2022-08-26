import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import userRoutes from './users';

const app = new express();
app.use(express.json());
app.use('/', userRoutes);


describe('login route', () => {
    it('should return status code 200', (done) => {
        request(app)
            .post('/login')
            .send({
                username: 'loginName',
                password: 'password12'
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

describe('register route', () => {
    it('should return status code 204 on /user route', (done) => {
        request(app)
            .post('/user')
            .send({
                id: `randomID${Math.random() * 101}`,
                login: `randomName${Math.random() * 101}`,
                password: `randomPW${Math.random() * 101}`,
                age: 16,
                isDeleted: false
            })
            .set('Accept', 'application/json')
            .expect(204, done);
    });

    it('should return status code 400', (done) => {
        request(app)
            .post('/user')
            .send({
                id: `randomID${Math.random() * 101}`,
                login: `randomName${Math.random() * 101}`,
                password: `randomPW${Math.random() * 101}`,
                age: 1,
                isDeleted: false
            })
            .set('Accept', 'application/json')
            .expect(400, done);
    });
});

describe('authentication and get user by id', () => {
    it('should authenticate and get user61', (done) => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('Some decoded token');
        request(app)
            .get('/user/user61')
            .set('auth_token', 'somerandomjwttoken')
            .set('Accept', 'application/json')
            .expect(
                200,
                {
                    id: 'user61',
                    login: 'loginName',
                    password: 'password12',
                    age: 15,
                    isDeleted: false
                },
                done
            );
    });

    it('should fail to authenticate and return status code 401', (done) => {
        request(app)
            .get('/user/user61')
            .set('Accept', 'application/json')
            .expect(401, '{"success":false,"message":"No token provided."}', done);
    });
});

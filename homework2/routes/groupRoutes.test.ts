import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import groupRoutes from './groups';

const app = new express();
app.use(express.json());
app.use('/', groupRoutes);


describe('post group route', () => {
    it('should return status code 204', (done) => {
        request(app)
            .post('/group')
            .send({
                id: `randomID${Math.random() * 101}`,
                name: `randomName${Math.random() * 101}`,
                permissions:['WRITE', 'READ', 'DELETE', 'SHARE']
            })
            .set('Accept', 'application/json')
            .expect(204, done);
    });

    it('should return status code 500', (done) => {
        request(app)
            .post('/group')
            .send({
                name: 'randomName',
                permissions:['WRITE', 'READ', 'DELETE', 'SHARE']
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('/get group by id', () => {
    it('should return status code 204 on /group/:id route and group info', (done) => {
        request(app)
            .get('/group/group8')
            .set('Accept', 'application/json')
            .expect(200, {
                'id': 'group8',
                'name': 'group8',
                'permissions': [
                    'WRITE',
                    'READ',
                    'DELETE',
                    'SHARE'
                ]
            }, done);
    });
});

describe('/user_group route', () => {
    it('should return status code 204 ', (done) => {
        request(app)
            .put('/user_group?userIds=user60&groupId=group9')
            .set('Accept', 'application/json')
            .expect(204, done);
    });
});

import request from 'supertest'; // used to mock requests
import express from 'express';
import groupRoutes from '../groups';
import { deleteGroup } from '../../utilities/deleteMockedData';

const app = new express();
app.use(express.json());
app.use('/', groupRoutes);

// create mock group
let mockGroup;
beforeEach(() => {
    mockGroup = {
        id: 'mockGroupID',
        name: 'mockGroupName',
        permissions:['WRITE', 'READ', 'DELETE', 'SHARE']
    };
});

// delete mocked group from DB after all tests
afterAll(() => {
    deleteGroup(mockGroup.id);
});

describe('post /group route', () => {
    it('should add group in db and return status code 204', (done) => {
        request(app)
            .post('/group')
            .send(mockGroup)
            .set('Accept', 'application/json')
            .expect(204, done);
    });

    it('should fail to add group in db and return status code 500', (done) => {
        mockGroup.name = 'wrongGroupName';
        request(app)
            .post('/group')
            .send(mockGroup)
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('get group by id and update group by id', () => {
    it('should return status code 204 on /group/:id route and group info', (done) => {
        request(app)
            .get(`/group/${mockGroup.id}`)
            .set('Accept', 'application/json')
            .expect(200, mockGroup, done);
    });

    it('should successfully update group', (done) => {
        mockGroup.name = 'updatedMockUserName';
        request(app)
            .put(`/group/${mockGroup.id}`)
            .send(mockGroup)
            .set('Accept', 'application/json')
            .expect(204, done);
        request(app)
            .get(`/group/${mockGroup.id}`)
            .expect(200, mockGroup, done);
    });
});


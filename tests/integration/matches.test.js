const app = require('../../src/app');
const supertest = require('supertest');
const agent = supertest(app);

const db = require('../../src/utils/database');
const pieces = require('../helpers/piecesObject');
const uuid = require('uuid');

async function cleanDatabase() {
    await db.query('DELETE FROM pieces');
    await db.query('DELETE FROM matches');
}

beforeEach(cleanDatabase);
afterEach(cleanDatabase);

afterAll(async () => {
    await db.close();
});

describe('POST /matches', () => {
    it('should return 201 and the object with all match data', async () => {
        const response = await agent.post('/matches');
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject({
            secretKey: expect.any(String),
            status: 'whitePlay',
            pieces
        });
    });
});

describe('Middleware authenticateGame', () => {
    it('should return 422 when passed no headers', async () => {
        const response = await agent.get('/matches/9999');

        expect(response.status).toBe(422);
    });

    it('should return 422 when passed invalid header format Player-Color', async () => {
        const response = await agent
            .get('/matches/9999')
            .set({'Player-Color': 'blue', 'Secret-Key': uuid.v4()});

        expect(response.status).toBe(422);
    });

    it('should return 422 when passed invalid header format Secret-Key', async () => {
        const response = await agent
            .get('/matches/9999')
            .set({'Player-Color': 'white', 'Secret-Key': '2349'});

        expect(response.status).toBe(422);
    });

    it('should return 401 when passed a not found Secret-Key', async () => {
        const response = await agent
            .get('/matches/9999')
            .set({'Player-Color': 'white', 'Secret-Key': uuid.v4()});

        expect(response.status).toBe(401);
    });
});

describe('GET /matches/:id', () => {
    it('should return 404 when passed a invalid id, but correct headers', async () => {
        const result = await agent.post('/matches');

        const response = await agent
            .get('/matches/0')
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey});

        expect(response.status).toBe(404);
    });

    it('should return 200 and a Match object when passed a valid id and headers', async () => {
        const result = await agent.post('/matches');

        const response = await agent
            .get(`/matches/${result.body.id}`)
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toMatchObject({
            secretKey: expect.any(String),
            status: 'whitePlay',
            pieces
        });
    });
});
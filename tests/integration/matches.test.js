const app = require('../../src/app');
const supertest = require('supertest');
const agent = supertest(app);
const db = require('../../src/utils/database');
const pieces = require('../helpers/piecesObject');

async function cleanDatabase() {
    await db.query('DELETE FROM pieces');
    await db.query('DELETE FROM matches');
}

beforeEach(cleanDatabase);
afterEach(cleanDatabase);

afterAll(async () => {
    db.close();
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
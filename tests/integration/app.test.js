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

afterAll(async () => {
    await db.close();
});

describe('POST /matches', () => {
    it('should return 201 and the object with all match data', async () => {
        const response = await agent.post('/matches');
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.pieces[0]).toHaveProperty('id');
        expect(response.body.pieces[0]).toHaveProperty('matchId');
        expect(response.body).toMatchObject({
            secretKey: expect.any(String),
            status: 'whitePlay',
            pieces
        });
    });
});

describe('Middleware authenticateGame', () => {
    it('should return 422, when passed no headers', async () => {
        const response = await agent.get('/matches/9999');

        expect(response.status).toBe(422);
    });

    it('should return 422, when passed invalid header format in Player-Color', async () => {
        const response = await agent
            .get('/matches/9999')
            .set({'Player-Color': 'blue', 'Secret-Key': uuid.v4()
        });

        expect(response.status).toBe(422);
    });

    it('should return 422, when passed invalid header format in Secret-Key', async () => {
        const response = await agent
            .get('/matches/9999')
            .set({'Player-Color': 'white', 'Secret-Key': '2349'
        });

        expect(response.status).toBe(422);
    });

    it('should return 401, when passed a unauthorized Secret-Key', async () => {
        const response = await agent
            .get('/matches/9999')
            .set({'Player-Color': 'white', 'Secret-Key': uuid.v4()
        });

        expect(response.status).toBe(401);
    });
});

describe('Middleware authenticatePieces', () => {
    it('should return 404, when piece id is invalid', async () => {
        const result = await agent.post('/matches');

        const response = await agent
            .get('/pieces/0/moves')
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey
        });

        expect(response.status).toBe(404);
    });

    it('should return 403, when Player-Color is not equal to the color piece', async () => {
        const result = await agent.post('/matches');

        const response = await agent
            .get(`/pieces/${result.body.pieces[0].id}/moves`)
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey
        });

        expect(response.status).toBe(403);
    });

    it('should return 403, when Player-Color is not equal to the match status', async () => {
        const result = await agent.post('/matches');

        const response = await agent
            .get(`/pieces/${result.body.pieces[0].id}/moves`)
            .set({'Player-Color': 'black', 'Secret-Key': result.body.secretKey
        });

        expect(response.status).toBe(403);
    });
});

describe('GET /matches/:id', () => {
    it('should return 404, when match id is invalid, but correct headers', async () => {
        const result = await agent.post('/matches');

        const response = await agent
            .get('/matches/0')
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey
        });

        expect(response.status).toBe(404);
    });

    it('should return 200 and a Match object, when passed a valid id and headers', async () => {
        const result = await agent.post('/matches');

        const response = await agent
            .get(`/matches/${result.body.id}`)
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.pieces[0]).toHaveProperty('id');
        expect(response.body.pieces[0]).toHaveProperty('matchId');
        expect(response.body).toMatchObject({
            secretKey: expect.any(String),
            status: 'whitePlay',
            pieces
        });
    });
});

describe('POST /pieces/:id/moves', () => {
    it('should return 422, when no body is sended', async () => {
        const result = await agent.post('/matches');
    
        const response = await agent
            .post(`/pieces/${result.body.pieces[pieces.length - 1].id}/moves`)
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey
        });
    
        expect(response.status).toBe(422);
    });
    
    it('should return 422, when body is the incorrect format', async () => {
        const body = {
            row: 12,
            col: 13
        }
    
        const result = await agent.post('/matches');
    
        const response = await agent
            .post(`/pieces/${result.body.pieces[pieces.length - 1].id}/moves`)
            .send(body)
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey
        });
            
        expect(response.status).toBe(422);
    });

    it('should return 403, when movement is not allowed', async () => {
        const body = {
            row: 3,
            col: 3
        }
    
        const result = await agent.post('/matches');
    
        const response = await agent
            .post(`/pieces/${result.body.pieces[pieces.length - 1].id}/moves`)
            .send(body)
            .set({'Player-Color': 'white', 'Secret-Key': result.body.secretKey
        });
            
        expect(response.status).toBe(403);
    });
});
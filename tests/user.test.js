const { request, app, cleanDB, createPet, createVisit } = require('./helpers');

beforeAll(async () => {
    await cleanDB();
});

describe('User API', () => {
    test('should create a new user', async () => {
        let newUser = {
            name: "James Birch",
            email: "james@vet.com",
            password: "passwordHere",
            role: "vettech"
        };

        let response = await request(app)
            .post('/api/register')
            .send(newUser);
    
        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.name).toBe('James Birch');
    });

    test('should login', async () => {
        let credentials = {
            email: "james@vet.com",
            password: "passwordHere"
        };

        let response = (await request(app)
            .post('/api/login')
            .send(credentials));

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token"); 
    });

    test('should logout', async () => {
        let response = await request(app).post('/api/logout');
    
        expect(response.status).toBe(200);
    });
});
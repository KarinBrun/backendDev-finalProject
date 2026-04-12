const { request, app, cleanDB } = require('./helpers');

beforeAll(async () => {
    await cleanDB();
});

describe('Pets API', () => {
    test('should create a new pet', async () => {
        let newPet = {
            ownerName: "Larry",
            name: "Grilled Cheese",
            species: "cat",
            breed: "dom longhair",
            gender: "female",
            age: "4 years",
            color: "brown tabby"
        };

        let response = await request(app)
            .post('/api/pets')
            .send(newPet);
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Grilled Cheese');
    });

    test('should return all pets', async () => {
        let response = await request(app).get('/api/pets');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); 
    });

    test('should return pet by ID', async () => {
        let response = await request(app).get('/api/pets/1');
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('ownerName');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('species');
        expect(response.body).toHaveProperty('breed');
        expect(response.body).toHaveProperty('gender');
        expect(response.body).toHaveProperty('age');
        expect(response.body).toHaveProperty('color');
    });

    test('should return an error when ID not found', async () => {
        const response = await request(app).get('/api/pets/999');
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should update existing pet', async () => {
        let updatedPet = {
            ownerName: 'Bob Dole',
            name: 'Fluffy',
            species: 'dog',
            breed: 'lab',
            gender: 'male',
            age: '6 years',
            color: 'black'
        };

        let response = await request(app)
            .put('/api/pets/1')
            .send(updatedPet);
    
        expect(response.status).toBe(200);
        expect(response.body.ownerName).toBe('Bob Dole');
    });

    test('should delete existing pet', async () => {
        let response = await request(app).delete('/api/pets/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });
});
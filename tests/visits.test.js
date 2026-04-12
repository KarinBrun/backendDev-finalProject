const { request, app, cleanDB, createPet } = require('./helpers');

let petId;

beforeAll(async () => {
    await cleanDB();
    petId = await createPet();
});

describe('Visits API', () => {
    test('should create a new visit', async () => {
        let newVisit = {
            visitDate: "",
            initialReason: "Annual vaccines",
            symptoms: "None",
            diagnosis: "Healthy",
            priority: "low",
            petsId: petId
        };

        let response = await request(app)
            .post('/api/visits')
            .send(newVisit);
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.initialReason).toBe('Annual vaccines');
    });

    test('should return all visits', async () => {
        let response = await request(app).get('/api/visits');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); 
    });

    test('should return visit by ID', async () => {
        let response = await request(app).get('/api/visits/1');
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('visitDate');
        expect(response.body).toHaveProperty('initialReason');
        expect(response.body).toHaveProperty('symptoms');
        expect(response.body).toHaveProperty('diagnosis');
        expect(response.body).toHaveProperty('priority');
        expect(response.body).toHaveProperty('Pet');
        expect(response.body).toHaveProperty('Treatments');
    });

    test('should return an error when ID not found', async () => {
        const response = await request(app).get('/api/visits/999');
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should update existing visits', async () => {
        let updatedVisit = {
            visitDate: "",
            initialReason: "Annual vaccines and exam",
            symptoms: "None",
            diagnosis: "Healthy",
            priority: "low",
            petsId: petId
        };

        let response = await request(app)
            .put('/api/visits/1')
            .send(updatedVisit);
    
        expect(response.status).toBe(200);
        expect(response.body.initialReason).toBe('Annual vaccines and exam');
    });

    test('should delete existing visit', async () => {
        let response = await request(app).delete('/api/visits/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });
});
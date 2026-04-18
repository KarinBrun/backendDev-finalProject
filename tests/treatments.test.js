const { request, app, cleanDB, createUser, loginUser, createPet, createVisit } = require('./helpers');

let jwtToken;
let petId;
let visitId;

beforeAll(async () => {
    await cleanDB();
    await createUser();
    jwtToken = await loginUser();
    petId = await createPet(jwtToken);
    visitId = await createVisit(petId, jwtToken);
});

describe('Treatments API', () => {
    test('should create a new treatment', async () => {
        let newTreatment = {
            issue: "sore leg from vaccines",
            description: "Administered vaccines in right front leg, will be sore and pet will be tired",
            instructions: "Monitor for any fever or abnormal lack of energy",
            visitsId: visitId
        };

        let response = await request(app)
            .post('/api/treatments')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(newTreatment);
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.issue).toBe('sore leg from vaccines');
    });

    test('should return all treatments', async () => {
        let response = await request(app)
            .get('/api/treatments')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); 
    });

    test('should return treatment by ID', async () => {
        let response = await request(app)
            .get('/api/treatments/1')
            .set('Authorization', `Bearer ${jwtToken}`);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('issue');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('instructions');
        expect(response.body).toHaveProperty('Visit');
    });

    test('should return an error when ID not found', async () => {
        const response = await request(app)
            .get('/api/treatments/999')
            .set('Authorization', `Bearer ${jwtToken}`);
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should update existing treatments', async () => {
        let updatedTreatment = {
            issue: "sore leg from vaccines",
            description: "Administered vaccines in right front leg, will be sore and pet will be tired",
            instructions: "Monitor for any fever or abnormal lack of energy, call if you notice anything unusual",
            visitsId: visitId
        };

        let response = await request(app)
            .put('/api/treatments/1')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send(updatedTreatment);
    
        expect(response.status).toBe(200);
        expect(response.body.instructions).toBe('Monitor for any fever or abnormal lack of energy, call if you notice anything unusual');
    });

    test('should delete existing treatment', async () => {
        let response = await request(app)
            .delete('/api/treatments/1')
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });
});
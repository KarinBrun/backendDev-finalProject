const request = require('supertest');
const app = require('../server');
const { db } = require('../database/setup');

async function cleanDB() {
  await db.sync({ force: true });
}

async function createUser() {
    let newUser = {
        name: "Mary Sherif",
        email: "mary@vet.com",
        password: "passwordHere",
        role: "admin"
    };

    let response = await request(app)
        .post('/api/register')
        .send(newUser);

    return response.body.user.id;
};

async function loginUser() {
    let credentials = {
        email: "mary@vet.com",
        password: "passwordHere"
    }

    let response = await request(app)
        .post('/api/login')
        .send(credentials);

    return response.body.token;
}

async function createPet(jwtToken) {
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
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(newPet);

    return response.body.id;
}

async function createVisit(petId, jwtToken) {
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
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(newVisit);

    return response.body.id;
}

module.exports = { request, app, db, cleanDB, createUser, loginUser, createPet, createVisit };
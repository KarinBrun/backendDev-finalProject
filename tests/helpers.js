const request = require('supertest');
const app = require('../server');
const { db } = require('../database/setup');

async function cleanDB() {
  await db.sync({ force: true });
}

async function createPet() {
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

    return response.body.id;
}

async function createVisit(petId) {
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

    return response.body.id;
}

module.exports = { request, app, db, cleanDB, createPet, createVisit };
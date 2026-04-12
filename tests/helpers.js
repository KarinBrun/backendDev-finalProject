const request = require('supertest');
const app = require('../server');
const { db } = require('../database/setup');

async function cleanDB() {
  await db.sync({ force: true });
}

module.exports = { request, app, db, cleanDB };
const request = require('supertest')
const app = require('../src/app')

// test('Valid city string with empty cuisines and max for two', async () => {
//     await request(app).get('/restaurants').type('form').query({
//         city: 'ranchi'
//     }).expect(200)
// })

// test('Valid city string with valid cuisines and empty max for two', async () => {
//     await request(app).get('/restaurants').type('form').query({
//         city: 'ranchi',
//         cuisines: 'north indian'
//     }).expect(200)
// })
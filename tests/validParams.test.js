const request = require('supertest')
const app = require('../src/app')

test('Valid city string with empty cuisines and max for two', async () => {
    response = await request(app).get('/restaurants').type('form').query({
        city: 'ranchi'
    }).expect(200)
})

test('Valid city string with valid cuisines and empty max for two', async () => {
    await request(app).get('/restaurants').type('form').query({
        city: 'ranchi',
        cuisines: 'north indian'
    }).expect(200)
})


test('Should successfully return list for a valid city with empty cuisines and max cost for two', async () => {
    await request(app).get('/restaurants').type('form').query({
        city: 'ranchi',
        cuisines: '',
        max_for_two: ''
    }).expect(200)
})
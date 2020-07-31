const request = require('supertest')
const app = require('../src/app')

test('Should fail for empty request body', async () => {
    await request(app).get('/restaurants').type('form').query({
    }).expect(404)
})

test('Should fail for empty city string', async () => {
    await request(app).get('/restaurants').type('form').query({
        city: ''
    }).expect(404)
})

test('Should throw error for empty city string with cuisines', async () => {
    await request(app).get('/restaurants').type('form').query({
        city: '',
        cuisines: 'north Indian, south Indian'
    }).expect(404)
})

test('Should fail for malicious expression in city string', async () => {
    await request(app).get('/restaurants').type('form').query({
        city: 'ranchi?${A..Z}',
        cuisines: '',
        max_for_two: ''
    }).expect(404)
})

test('Should fail for malicious expression in cuisines string', async () => {
    await request(app).get('/restaurants').type('form').query({
        city: 'ranchi',
        cuisines: 'northIndian{1..9}',
        max_for_two: ''
    }).expect(404)
})
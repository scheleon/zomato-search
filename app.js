const express = require('express')
const find = require('./find')
const fs = require('fs')

const port = 4478

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.htm')
})

app.get('/script.js', (req, res) =>{
    res.sendFile(__dirname + '/script.js')
})

app.get('/styles.css', (req, res) =>{
    res.sendFile(__dirname + '/styles.css')
})

app.get('/restaurants', async (req, res) => {
    console.log(req.query)
    cuisines = req.query.cuisines
    city = req.query.city
    max_for_two = req.query.max_for_two
    def = 1e9 + 7
    
    if(cuisines == '' || cuisines == '*'){
        cuisines = "null"
    }

    if(max_for_two == '' || max_for_two < 0){
        max_for_two = def
    }

    find(city, cuisines, max_for_two, res)
})

app.listen(port, () => {
    console.log('Server is running on', port)
})
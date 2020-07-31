const express = require('express')
const path = require('path')
const find = require('./scripts/find')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('', (req, res) => {
    res.sendFile(`${publicDirectoryPath}/index.htm`)
})

app.get('/restaurants', async (req, res) => {
    // console.log(req.query)
    cuisines = req.query.cuisines
    city = req.query.city
    max_for_two = req.query.max_for_two
    def = 1e9 + 7
    
    if(cuisines == null || cuisines == undefined || cuisines == '' || cuisines == '*'){
        cuisines = 'empty'
    }

    if(max_for_two == null || max_for_two == undefined || max_for_two == '' || max_for_two < 0){
        max_for_two = def
    }

    // console.log(city, cuisines, max_for_two)

    find(city, cuisines, max_for_two, res)
})

module.exports = app
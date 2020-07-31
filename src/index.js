const app = require('./app')

const port = process.env.PORT || 4478

app.listen(port, () => {
    console.log('Server is running on', port)
})
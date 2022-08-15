const express = require('express')

const PORT = 8080
const HOST = "0.0.0.0"

const app = express()

app.get('/', (req, res) => {
    res.send('도커')
})

app.listen(PORT, HOST, () => {
    console.log(`server is running on http:${HOST}:${PORT}`)
})


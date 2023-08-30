const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
// app.get('/login', (req, res) => {
//     res.send('Hello login!')
// })
// app.get('/signup', (req, res) => {
//     res.send('Hello signup!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
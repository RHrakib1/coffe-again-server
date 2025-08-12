const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;


//midelware
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('coffe is running by me ')
})

app.listen(port, () => {
    console.log(`coffe server is running on port ${port}`)
})
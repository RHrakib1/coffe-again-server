const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//midelware
app.use(express.json())
app.use(cors())

// ui6n7xoOk4qIGOHk
// Coffe-server


const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASSWORD}@cluster0.vlbcfwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("Coffeee");
        const coffecollection = database.collection("coffeCollection");


        app.get('/postcoffedata', async (req, res) => {
            const findcoffe = coffecollection.find()
            const result = await findcoffe.toArray()
            res.send(result)
        })

        app.get(`/postcoffedata/:id`, async (req, res) => {
            const id = req.params.id
            const quary = { _id: new ObjectId(id) }
            const result = await coffecollection.findOne(quary)
            res.send(result)
        })

        app.put('/postcoffedata/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = { upset: true };
            const updatecoffe = req.body;
            const coffe = {
                $set: {
                    name: updatecoffe.name,
                    able: updatecoffe.able,
                    supply: updatecoffe.supply,
                    catagory: updatecoffe.catagory,
                    photourl: updatecoffe.photourl
                }
            };
            const result = coffecollection.updateOne(filter, coffe, options)
            res.send(result)

        })


        app.post('/postcoffedata', async (req, res) => {
            const data = req.body
            console.log('data peyesi post kora data', data)
            const result = await coffecollection.insertOne(data)
            res.send(result)
            console.log("Insert result:", result);
        })
        app.delete('/postcoffedata/:id', async (req, res) => {
            const id = req.params.id
            console.log('database deletet id hare:::', id)
            const quary = { _id: new ObjectId(id) }
            const result = await coffecollection.deleteOne(quary)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('coffe is running by me ')
})

app.listen(port, () => {
    console.log(`coffe server is running on port ${port}`)
})
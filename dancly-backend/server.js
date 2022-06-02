import express from 'express'
import { MongoClient } from "mongodb";
import Cors from "cors"

import dbCards from './dbCards.js';

// App Config

const app = express();
const port = process.env.PORT || 8001

const connection_url = "mongodb+srv://admin:admin1@cluster0.v31sc.mongodb.net/Cluster0?retryWrites=true&w=majority"

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello'));

app.get('/login', (req, res) => res.status(200));

app.post('/signup', (req, res) => {
    const client = new MongoClient(connection_url)
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(connection_url)

    try {
        await client.connect()
        const dbname = client.db('danclydb')
        const users = dbname.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})

app.post('/dancly/cards', (req, res) => {
    const dbCard = req.body;
    dbCards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.get('/dancly/cards', (req, res) => {
    dbCards.create((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

/* Listener */
app.listen(port, () => console.log('Listening on localhost: ' + port));
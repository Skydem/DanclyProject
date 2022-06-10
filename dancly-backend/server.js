import express from 'express'
import { MongoClient } from "mongodb";
import Cors from "cors"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
// const {v4: uuidv4} = require('uuid')
import { v4 as uuidv4 } from 'uuid';

// const jwt = require('jsonwebtoken');

// App Config
const app = express();
const port = process.env.PORT || 8001;

// DB Config
const connection_url = "mongodb+srv://admin:admin1@cluster0.v31sc.mongodb.net/Cluster0?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());

// Important variables
const client = new MongoClient(connection_url);
const database = client.db('danclydb');
const users = database.collection('users');


// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello'));

app.get('/login', (req, res) => res.status(200));

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await users.findOne({email});
    try {
        await client.connect();
        const correctPass = await bcrypt.compare(password, user.hashed_password);

        if(user && correctPass) {
            const token = jwt.sign(user, email, {
                expiresIn: 900,
            });
            res.status(200).json({token, userId: user.user_id})
        }
        res.status(400).send('Niepoprawne dane logowania.');

    } catch (err) {
        console.log(err);
    }
});

app.post('/signup', async (req, res) => {
    const {email, password} = req.body
    const user = await users.findOne({email});
    const generatedUserId = uuidv4();
    const hashedPass = await bcrypt.hash(password, 10);

    try {
        await client.connect()

        if(user) {
            return res.status(409).send("Użytkownik z podanym mailem istnieje. Proszę się zalogować.")
        }

        const sanitizedEmail = email.toLowerCase()
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPass
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 900,
        });

        res.status(201).json({token, userId: generatedUserId});

    } catch (err) {
        console.log(err);
    }
});

app.get('/user', async (req,res) => {
    const userIde = req.query.userId;
    try {
        await client.connect();

        const query = { user_id: userIde };
        const user = await users.findOne(query);

        res.send(user);
    } finally {
        await client.close();
    }
});

app.get('/gendered-users', async (req, res) => {
    const gender = req.query.gender; // w Dashboardzie trzeba będzie pobrać wartość gender
    try {
        await client.connect();
        const query = {gender_identity: {$eq: gender}};
        const returnedUsers = await users.find(query).toArray();

        res.send(returnedUsers);
    } finally {
        await client.close();
    }
});

app.put('/user', async (req, res) => {
    const formData = req.body;

    try {
        await client.connect();
        const query = {user_id: formData.user_id};
        const updateInfo = {
            $set: {
                firstName: formData.firstName,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }

        const insertedUser = await  users.updateOne(query, updateInfo);

        res.json(insertedUser);

    } finally {
        await client.close();
    }
});

app.put('/add-match', async (req, res) => {
    const { userId, matchedUserId } = req.body;
    try {
        await client.connect();
        const query = { user_id: userId };
        const updateDoc = {
            $push: { matches: matchedUserId },
        }
        res.send(await users.updateOne(query, updateDoc));
    } finally {
        await client.close();
    }
});

app.get('/users', async (req, res) => {
    const userIds = JSON.parse(req.query.userIds); // Dodać z dashboard.js
    try {
        await client.connect();
        const pipeline =
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ];

        const foundUsers = await users.aggregate(pipeline).toArray();
        res.send(foundUsers);

    } finally {
        await client.close();
    }
});

app.get('/messages', async (req, res) => {
    const messages = database.collection('messages');
    const { userId, correspondingUserId} = req.query;
    try {
        await client.connect();
        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages = await messages.find(query).toArray();

        res.send(foundMessages);
        await client.close();
    } finally {
        
    }
});

app.post('/message', async (req, res) => {
    const message = req.body.message;

    try {
        await client.connect();
        const messages = database.collection('messages');
        const sentMessage = await messages.insertOne(message);

        res.send(sentMessage);
        await client.close();
    } finally {
        console.log('.')
    }
});

/* Listener */
app.listen(port, () => console.log('Listening on localhost: ' + port));
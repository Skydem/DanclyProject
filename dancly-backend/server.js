import express from 'express'
import { MongoClient } from "mongodb";
import Cors from "cors"
import bcrypt from "bcrypt";

const jwt = require('jsonwebtoken');

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
const user = await users.findOne({email});

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello'));

app.get('/login', (req, res) => res.status(200));

app.post('login', async (req, res) => {
    const {email, password} = req.body;

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

    const generatedUserId = uuidv1();
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
    const userId = req.params.userId;

    try {
        await client.connect();

        const query = { user_id: userId };
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
    const formData = req.body.formData;

    try {
        await client.connect();

        const query = {user_id: formData.user_id};
        const updateInfo = {
            $set: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                birth_day: formData.birth_day,
                birth_month: formData.birth_month,
                birth_year: formData.birth_year,
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
            $push: { matches: { user_id: matchedUserId}},
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
    } finally {
        await client.close();
    }

});

app.post('/message', async (req, res) => {
    const message = req.body.message;

    try {
        await client.connect();
        const messages = database.collection('messages');
        const sentMessage = await messages.insertOne(message);

        res.send(sentMessage);

    } finally {
        await client.close();
    }
});

/* Listener */
app.listen(port, () => console.log('Listening on localhost: ' + port));
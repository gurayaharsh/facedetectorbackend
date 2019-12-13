const express = require('express') ; 
const bodyparser = require ('body-parser'); 
const bcrypt = require('bcryptjs'); 
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile =  require('./controllers/profile');
const image = require('./controllers/image')

const app = express(); 
app.use(bodyparser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,  
      ssl: true
    }
  })
  

app.get('/', (req,res) => {
    res.json(db.users);
})

app.get('/profile/:id', (req,res) => {profile.handleprofile(req,res,db)});

app.post('/signin', (req,res) => {signin.handlesignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleregister(req,res,db,bcrypt)}); 

app.put('/entries', (req,res) => {image.handleEntries(req,res,db)});

app.post('/imageurl', (req,res) => {image.handleAPICall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log("app is running on", process.env.PORT)
})




const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Uu305330029',
  database: 'users'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});


// Middleware setup
app.use(bodyParser.json());

// POST API to create users
app.post('/api/usersCreate', (req, res) => {
  const { email, password, phoneNumber, fullName } = req.body;

  const insertUserQuery = 'INSERT INTO users (email, password, phoneNumber, fullName) VALUES (?, ?, ?, ?)';

    db.query(insertUserQuery, [email, password, phoneNumber, fullName], (err, result) => {
    if (err) {
      console.error('Error creating user: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'User created successfully' });
    }
  });

});

// GET API to retrieve user details without phoneNumber and password
app.get('/api/usersDetails', (req, res) => {
  const selectQuery = `SELECT email, fullName FROM users`;

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error retrieving user details: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});


app.post('/api/usersLogin', (req, res) => {
  const selectQuery = "SELECT email, password FROM users WHERE email=? AND password=?;";

  db.query(selectQuery,[req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error('Error retrieving user details: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length==0){
        res.status(200).json({ message: 'This user is not in the system' });
      } else{
        res.status(200).json({ message: 'OK' });
      }
    }
  });
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


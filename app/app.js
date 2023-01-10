const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt =require('bcrypt');
const e = require('cors');

require('dotenv').config();

//console.log(process.env.MYSQL_HOST);

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSLQ_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);

//Endpoint grąžina visus expenses (išlaidas):
//   app.get('/expenses', (req, res) => {
//       connection.execute('SELECT * FROM expenses', (err, expenses) => {
//           console.log(expenses);
//           res.send(expenses);
//       })
//   })

 // Endpointas grąžina išlaidas pagal išlaidų id:
//Patestuokime endpoint per Postman

 app.get('/expenses/:id', (req, res) => {
      const {id} = req.params;
      connection.execute('SELECT * FROM expenses WHERE id=?', [id], (err, expenses) => {
          console.log(expenses);
          res.send(expenses);
      })
  })

// Endpointas grąžina būtent mūsų išlaidas pagal userId:

// app.get('/expenses/:userId', (req, res) => {
//     const { userId } = req.params;
//     connection.execute('SELECT * FROM expenses WHERE userId=?', [userId], (err, expenses) => {
//         console.log(expenses);
//         res.send(expenses);
//     })
// })

//Galima užrašyti kitu būdu, man sitas gerai veike:
app.get('/expenses', (req, res) => {
     const { userId } = req.query;
     connection.execute('SELECT * FROM expenses WHERE userId=?', [userId], (err, expenses) => {
         console.log(expenses);
         res.send(expenses);
     });
});

app.post('/expenses', (req, res) => {
    const { type, amount, userId } = req.body;

    connection.execute(
        'INSERT INTO expenses (type, amount, userId) VALUES (?, ?, ?)',
        [type, amount, userId],
        () => {
            connection.execute(
                'SELECT * FROM expenses WHERE userId=?', 
                [userId], 
                (err, expenses) => {
                    console.log(expenses);
                    res.send(expenses);
                }
            )
        }
    )
});

app.post('/register', (req,res) => {
    const { name, password}= req.body;
    const hashedPassword = bcrypt.hashSync(password,12);

    connection.execute('INSERT INTO users (name,password) VALUES (?,?)',
        [name,hashedPassword],
        (err, result) => {
            console.log(err)
            res.sendStatus(200);
        }
    )
})

app.post('/login', (req,res) => {
    const { name, password}= req.body;
    
    connection.execute('SELECT * FROM users WHERE name=?',
        [name],
        (err,result) => {
            if (result.length ===0) {
                res.send('[Incorrect username or password');
            } else {
                console.log(result)
                const passwordHash = result[0].password
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    res.send('Successfully logged in!');
                } else {
                    res.send('Incorrect username or password');
                }
            }
        }
    );
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

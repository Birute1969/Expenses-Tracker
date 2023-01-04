const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Bartaseviciute1969',
    database: 'expenses-tracker',
    port: 3306
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

//Galima užrašyti kitu būdu:
app.get('/expenses', (req, res) => {
     const { userId } = req.query;
     connection.execute('SELECT * FROM expenses WHERE userId=?', [userId], (err, expenses) => {
         console.log(expenses);
         res.send(expenses);
     });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

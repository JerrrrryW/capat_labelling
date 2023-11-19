const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5001;
app.use(express.json());
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MYSQL1220',
  database: 'capat_labelling',
});


connection.connect();

app.get('/api/getAllPaintings', (req, res) => {
  console.log('Query: Get all paintings');
  connection.query('SELECT ImageID, PaintingID FROM Images ORDER BY ImageID;', (error, results, fields) => {
    if (error) throw error;

    res.json(results);

  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

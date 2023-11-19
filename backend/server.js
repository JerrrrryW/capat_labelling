const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Buffer = require('buffer').Buffer;

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

// 设置 multer 存储配置
const storage = multer.memoryStorage(); // 这里使用 memoryStorage，这意味着文件将保存在内存中
const upload = multer({ storage: storage });


connection.connect();

app.get('/api/getAllPaintings', (req, res) => {
  console.log('Query: Get all paintings');
  connection.query('SELECT ImageID, PaintingID FROM Images ORDER BY ImageID;', (error, results, fields) => {
    if (error) throw error;

    res.json(results);

  });
});

app.get('/api/getPaintingData/:PID', (req, res) => {
  const PID = req.params.PID;
  console.log(`Query: Get painting data for painting ${PID}`);

  // 使用参数化查询
  connection.query('SELECT * FROM Paintings WHERE PID = ?', [PID], (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post('/api/savePainitngLabelData', (req, res) => {
  const { paintingID, composition } = req.body;
  console.log(`Query: Save painting label data for painting ${paintingID}`);
  console.log(data);
  // 使用参数化查询
  connection.query('UPDATE Paintings SET composition = ? WHERE PID = ?', [composition, paintingID], (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post('/api/saveFragmentLabelData', upload.single('imageData'), (req, res) => {

  const { paintingID, category, cunFa, dianFa, sheSe, dianJing } = req.body;
  console.log(req.body);
  const imageData = req.file.buffer; // 使用 multer，图片文件数据会在 req.file.buffer

  console.log(`Query: Save fragment label data for fragment ${paintingID}`);

  // 检查 imageData 是否存在
  if (!imageData) {
    return res.status(400).send('No image data provided.');
  }

  // 保存 image data
  let counter = 1;
  let filename = `./fragments/${paintingID}_${counter}.png`;

  while (fs.existsSync(filename)) {
    counter++;
    filename = `./fragments/${paintingID}_${counter}.png`;
  }

  fs.writeFileSync(filename, imageData);
  console.log(`Saved image data to ${filename}`);
  // fragmentID = filename去除后缀.png
  let fragmentID = path.basename(filename, '.png');

  connection.query('INSERT INTO Fragments (FID, PID, category, cunFa, dianFa, sheSe, dianJing) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Category = ?, CunFa = ?, DianFa = ?, SheSe = ?, DianJing = ?',
    [fragmentID, paintingID, category, cunFa, dianFa, sheSe, dianJing, category, cunFa, dianFa, sheSe, dianJing], (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

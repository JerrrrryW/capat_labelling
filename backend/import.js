const fs = require('fs');
const mysql = require('mysql');

// 创建MySQL连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MYSQL1220',
  database: 'capat_labelling',
});

// 连接到数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// 读取目录下的所有图片文件
const directoryPath = '/Users/jerrywang/Pictures/img2';
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory: ' + err);
    return;
  }

  // 遍历文件
  files.forEach((file) => {
    // 提取文件名中的数字和顺序
    const matches = file.match(/(\d+)_?(\d*)\.png/);
    const imageID = file.replace(/\.[^/.]+$/, "");
    if (matches) {
      const paintingNumber = matches[1];
      const imageOrder = matches[2] || '0'; // 如果没有下划线，则默认为0
      console.log(`Painting number: ${paintingNumber}, image order: ${imageOrder}`);

      // 查询对应的PID
      const query = `SELECT PID FROM Paintings WHERE scroll = '${paintingNumber}'`;

      connection.query(query, (error, results, fields) => {
        if (error) throw error;
        // console.log(results)

        if (results.length > 0) {
          const pid = results[0].PID;

          // 插入数据到Image表
          const insertQuery = `INSERT INTO Images (ImageID, PaintingID, ImagePath, ImageOrder) VALUES ('${imageID}', '${pid}', '${directoryPath}/${file}', ${imageOrder})`;
          console.log(insertQuery);
          connection.query(insertQuery, (insertError, insertResults, insertFields) => {
            if (insertError) {
              console.error(`Error inserting ${file} into Image table: ${insertError}`);
              throw insertError;
            }
            console.log(`Inserted ${file} into Image table.`);
          });
        } else {
          console.log(`No corresponding PID found for scroll ${paintingNumber}.`);
        }
      });
    }
  });

});


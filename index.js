
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');

const bodyParser = require("body-parser");
//Minio
const { syncWithMinIO } = require('./sync'); 

app.use(cors())

app.use(bodyParser.json()); // Xử lý dữ liệu gửi đến dạng JSON

app.use(bodyParser.urlencoded({ extended: true }));


require("./database/init.mongodb")
// Kết nối cơ sở dữ liệu

// require("./redis/init.redis")
// Kết nối REDIS

// syncWithMinIO()
//   .then(() => console.log('Initial sync'))
//   .catch(error => console.error(' Error sync: ', error));

app.use("/api/", require("./getways/user.getway"));
// app.use("/api/", require("./getways/product.getway"));
// Khai báo route API


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// bắt đầu từ đây

//syncWithMinIO();
setInterval(function(){
  syncWithMinIO(libMongo);
}, 1000*3600*4)
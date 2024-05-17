// const connectString = "mongodb+srv://khanhson05072000:1234567890@cluster0.wo675js.mongodb.net/"
// const connectString = "mongodb+srv://nguyentuanlong1210:longdua1210@cluster0.gc0upfh.mongodb.net/"
// const connectString = "mongodb+srv://khanhson05072000:son050720@cluster0.emlhrub.mongodb.net/"


// Test
 const connectString = "mongodb+srv://nguyentuanlong1210:longdua1210@cluster0.gc0upfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// triển khai master/slave
//const connectString =
  //"mongodb://localhost:27018,localhost:27019,localhost:27020/admin?authSource=admin&replicaSet=hephantan";

// sau này sẽ đổi đường dẫn này
const mongoose = require("mongoose");



// Connect to MongoDB
mongoose
  .connect(connectString)
  .then(() => console.log("MongoDB connected: ", connectString))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;




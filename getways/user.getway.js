// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  updateRoleUser,
  deleteUser,
  login,
  changePassword,
} = require("../services/user.services");
const checkRoleUser = require("../middlewares/checkRuleUser");

// Định nghĩa các route cho quản lý người dùng
// router.get('/users/admin/:user_id', checkRoleUser ,userServices.getAllUsers); // Route để lấy tất cả người dùng
router.get("/users", getAllUser); // Route để lấy tất cả người dùng, Chỗ này đã xoá middleware vì không cần thiết
router.post("/users", createUser);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.put("/update-rule/:admin_id/:id", checkRoleUser, updateRoleUser); // API cập nhật quyền user, cần truyền vào :admin_id là id của tài khoản có quyền admin
// và truyền vào id của user cần cập nhật
// ví dụ: http://localhost:3000/api/users/123/456 với 123 là id của tài khoản user (Mục đích để sử dụng trong middleware, kiểm tra quyền hạn), và 456 là id của tài khoản cần cập nhật
// Lưu ý phần body chỉ truyền vào giá trị : "role" (là admin hoặc user gì đó)
router.delete("/users/:id", deleteUser);

router.post("/login", login);
router.post("/change-password/:username", changePassword);

module.exports = router;

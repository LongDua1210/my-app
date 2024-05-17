// userServices.js

const accountBusiness = require("../business/user_manager/account.business");
const UserBusiness = require("../business/user_manager/user.business");

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await UserBusiness.getUser(userId);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUserData = await UserBusiness.updateUser(userId, userData);
    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = await UserBusiness.updateUser(userId, {
      role: "admin"
    });
    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await UserBusiness.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await UserBusiness.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await UserBusiness.getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const username = req.params.username;
    const { oldPassword, newPassword } = req.body;
    await accountBusiness.changePassword(username, oldPassword, newPassword);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error, "mmm")
    res.status(500).json({ error: error.message, status: false });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const status = await accountBusiness.login(username, password);
    res.status(200).json(status);
  } catch (error) {
    console.log(error, "error---");
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
  updateRoleUser,
  deleteUser,
  createUser,
  getAllUser,
  changePassword,
  login,
};

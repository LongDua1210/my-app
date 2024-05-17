// userBusiness.js

const UserDAO = require('../../DAO/user.DAO');

const UserBusiness = {
    getUser: async (userId) => {
        try {
            // Gọi DAO để lấy thông tin người dùng từ cơ sở dữ liệu
            const userData = await UserDAO.getUserById(userId);
            return userData;
        } catch (error) {
            throw new Error('Error getting user');
        }
    },

    getAllUser: async () => {
        try {
            // Gọi DAO để lấy tất cả người dùng từ cơ sở dữ liệu
            const users = await UserDAO.getAllUsers();
            return users;
        } catch (error) {
            throw new Error('Error getting all users');
        }
    },

    updateUser: async (userId, userData) => {
        try {
            console.log(userData, "user data")
            // Gọi DAO để cập nhật thông tin người dùng trong cơ sở dữ liệu
            const updatedUserData = await UserDAO.updateUser(userId, userData);
            return updatedUserData;
        } catch (error) {
            throw new Error('Error updating user');
        }
    },

    createUser: async (userData) => {
        try {
            // Gọi DAO để tạo mới người dùng trong cơ sở dữ liệu
            const newUser = await UserDAO.createUser({
                ...userData,
                role: "customer"
            });
            return newUser;
        } catch (error) {
            throw new Error(`Error creating user in business: ${error}`);
        }
    },

    deleteUser: async (userId) => {
        try {
            // Gọi DAO để xoá người dùng từ cơ sở dữ liệu
            await UserDAO.deleteUser(userId);
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
};

module.exports = UserBusiness;

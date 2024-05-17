const UserDAO = require("../../DAO/user.DAO");

const updateRole = async (userId, role) => {
  try {
    try {
      // Chỉ cập nhật role
      const updatedUserData = await UserDAO.updateUser(userId, {
        role: role
      });
      return updatedUserData;
    } catch (error) {
      throw new Error("Error updating user");
    }
  } catch (error) {
    throw new Error("Error getting user");
  }
};

module.exports = {
  updateRole,
};

const UserDAO = require("../../DAO/user.DAO");

const accountBusiness = {
  login: async (username, password) => {
    try {
      const user_data = await UserDAO.getUserByUsername(username);
      if (user_data.password == password) {
        return {
          status: true,
          message: "Loginn successfully",
          data: user_data,
        };
      } else {
        throw new Error("Password fail");
      }
    } catch (error) {
      throw new Error(error); 
    }
  },
  changePassword: async (username, oldPassword, newPassword) => {
    try {
      const user_data = await UserDAO.getUserByUsername(username);

      console.log(user_data, "user data");

      if (user_data.password == oldPassword) {
        await UserDAO.updateUser(user_data._id, {
          password: newPassword,
        });

        return {
          status: true,
        };
      } else {
        return new Error({
          status: false,
          message: "Old password fail",
        });
      }
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  },
};

module.exports = accountBusiness;

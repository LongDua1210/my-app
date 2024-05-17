const {User} = require("../models/user.model")

const checkRoleUser = async(req, res, next) => {

    const id = req.params.admin_id;

    // Timf trong CSDL, lay ra thong tin admin_id
   const user_info = await User.findById(id);
    console.log(user_info, "user info")
   if (user_info.role == "admin") {
    next()
   }

   else {
    return res.status(403).json({
        message: "Khong co quyen truy cap"
    })
   }



}

module.exports = checkRoleUser
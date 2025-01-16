const User = require("../models/User");
const bcrypt = require('bcrypt');

async function createAdminAccount()
{
    try {
        const existingAdmin = await User.findOne({ email: "admin@test.com" });
        if(existingAdmin)
        {
            console.log("Admin account already exists");
        }
        else{
            await User.create({
                name:"Admin",                
                email:"admin@test.com",
                password:await bcrypt.hash('admin123',10),
                role:"admin"
            });
            console.log("Admin account created");
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { createAdminAccount };
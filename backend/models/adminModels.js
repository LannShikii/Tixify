const db = require("../config/db.js");

const Admin = {

    findByEmail: async (email) => {
        const [rows] = await db.query(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );

        return rows[0];
    }

};

module.exports = Admin;
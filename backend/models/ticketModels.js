const db = require("../config/db.js");

const Ticket = {

    getAll: async () => {
        const [rows] = await db.query(
            "SELECT * FROM tickets ORDER BY id DESC"
        );

        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM tickets WHERE id=?",
            [id]
        );

        return rows[0];
    },

    create: async (data) => {

        const {
            concert_name,
            artist,
            venue,
            concert_date,
            ticket_type,
            price,
            stock
        } = data;

        const [result] = await db.query(
            `INSERT INTO tickets
            (concert_name,artist,venue,concert_date,ticket_type,price,stock)
            VALUES(?,?,?,?,?,?,?)`,
            [
                concert_name,
                artist,
                venue,
                concert_date,
                ticket_type,
                price,
                stock
            ]
        );

        return result;
    },

    update: async (id,data)=>{

        const {
            concert_name,
            artist,
            venue,
            concert_date,
            ticket_type,
            price,
            stock
        } = data;

        const [result] = await db.query(
            `UPDATE tickets SET

            concert_name=?,
            artist=?,
            venue=?,
            concert_date=?,
            ticket_type=?,
            price=?,
            stock=?

            WHERE id=?`,
            [
                concert_name,
                artist,
                venue,
                concert_date,
                ticket_type,
                price,
                stock,
                id
            ]
        );

        return result;

    },

    delete: async(id)=>{

        const [result] = await db.query(
            "DELETE FROM tickets WHERE id=?",
            [id]
        );

        return result;

    }

}

module.exports = Ticket;
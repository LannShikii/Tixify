const db = require("../config/db");

const Transaction = {

    getAll: async () => {

        const [rows] = await db.query(`
            SELECT
                transactions.*,
                tickets.concert_name,
                tickets.artist
            FROM transactions
            JOIN tickets
            ON transactions.ticket_id=tickets.id
            ORDER BY transactions.id DESC
        `);

        return rows;

    },

    getById: async(id)=>{

        const [rows] = await db.query(`
            SELECT
                transactions.*,
                tickets.concert_name,
                tickets.artist
            FROM transactions
            JOIN tickets
            ON transactions.ticket_id=tickets.id
            WHERE transactions.id=?
        `,[id]);

        return rows[0];

    },

    create: async(data)=>{

        const{

            customer_name,
            customer_email,
            phone,
            ticket_id,
            quantity,
            total_price,
            payment_method

        }=data;

        const[result]=await db.query(

            `INSERT INTO transactions
            (
            customer_name,
            customer_email,
            phone,
            ticket_id,
            quantity,
            total_price,
            payment_method
            )

            VALUES(?,?,?,?,?,?,?)`,

            [
                customer_name,
                customer_email,
                phone,
                ticket_id,
                quantity,
                total_price,
                payment_method
            ]

        );

        return result;

    },

    update: async(id,data)=>{

        const{

            customer_name,
            customer_email,
            phone,
            ticket_id,
            quantity,
            total_price,
            payment_method,
            payment_status

        }=data;

        const[result]=await db.query(

            `UPDATE transactions SET

            customer_name=?,
            customer_email=?,
            phone=?,
            ticket_id=?,
            quantity=?,
            total_price=?,
            payment_method=?,
            payment_status=?

            WHERE id=?`,

            [

                customer_name,
                customer_email,
                phone,
                ticket_id,
                quantity,
                total_price,
                payment_method,
                payment_status,
                id

            ]

        );

        return result;

    },

    delete: async(id)=>{

        const[result]=await db.query(

            "DELETE FROM transactions WHERE id=?",

            [id]

        );

        return result;

    }

}

module.exports=Transaction;
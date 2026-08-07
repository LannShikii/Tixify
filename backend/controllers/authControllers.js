const Admin = require("../models/adminModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req,res)=>{

    try{

        const {email,password} = req.body;

        const admin = await Admin.findByEmail(email);

        if(!admin){

            return res.status(404).json({
                success:false,
                message:"Email tidak ditemukan"
            });

        }

        const match = await bcrypt.compare(password,admin.password);

        if(!match){

            return res.status(401).json({
                success:false,
                message:"Password salah"
            });

        }

        const token = jwt.sign(
            {
                id:admin.id,
                role:admin.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.json({

            success:true,

            token,

            admin:{
                id:admin.id,
                name:admin.name,
                email:admin.email
            }

        });

    }catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}
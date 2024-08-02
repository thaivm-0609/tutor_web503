import User from "../models/User.js";
import bcryptjs from "bcryptjs"; //ma hoa password
import jwt from "jsonwebtoken"; //tao token khi dang nhap
import { registerValidator,loginValidator } from "../validations/auth.js";
class AuthController {
    //dang ky
    async signUp(req,res) {
        //validate du lieu 
        const { error } = registerValidator.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const { email, password } = req.body; //lay du lieu ng dung gui len
        //kiem tra email da ton tai hay chua
        const existedEmail = await User.findOne({ email });
        if (existedEmail) {
            return res.status(400).json({
                message: "Email da duoc su dung"
            })
        }
        const hashedPass = await bcryptjs.hash(password,10);//ma hoa password
        //luu email/password vao bang User
        const user = await User.create({
            email,
            password: hashedPass
        });

        res.status(201).json({
            message: "Dang ky thanh cong",
            data: user
        })
    }

    //dang nhap
    async signIn(req,res) {
        //validate du lieu
        const { error } = loginValidator.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const {email, password} = req.body; //lay du lieu ng dung gui len
        //B1: check email co trong db hay ko?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email khong ton tai",
            })
        }

        //B2: kiem tra password co trung khop hay ko
        const checkedPass = await bcryptjs.compare(password,user.password);
        if (!checkedPass) { //neu ko trung khop
            return res.status(400).json({
                message: "Thong tin khong chinh xac",
            })
        }

        //.sign({data}, secretKey, { expiresIn: 60*60*24 })
        const token = jwt.sign({ id: user.id }, 'tutorWeb503', { expiresIn: "1d" });
        res.status(200).json({
            message: "Dang nhap thanh cong",
            data: user,
            token,
        })
    }
}

export default AuthController;
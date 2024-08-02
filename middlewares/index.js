// code base
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkPermission = async (req,res,next) => {
    try {
        //lay token ng dung gui len
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "User chua dang nhap"
            })
        }

        //kiem tra token co hop le hay khong
        const data = jwt.verify(token, 'tutorWeb503');
        if (!data) { //token khong hop le
            return res.status(401).json({
                message: "Thong tin user khong hop le"
            })
        }

        //token hop le, kiem tra xem co id hop le trong db hay ko
        const user = await User.findById(data.id);
        if (!user) { //neu khong ton tai user
            return res.status(401).json({
                message: "User khong hop le"
            })
        }

        next();
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export { checkPermission };
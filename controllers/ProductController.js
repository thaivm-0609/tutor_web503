import Product from "../models/Product.js";
import { createValidator } from "../validations/product.js";

class ProductController {
    //lấy danh sách sản phẩm
    async getList(req,res) {
        try {
            const products = await Product.find();
            res.status(200).json({
                message: "Lấy danh sách thành công",
                data: products
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    };

    async getDetail(req,res) {
        try {
            //lay id cua product
            const id = req.params.id;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({
                    message: "Không tìm thấy product"
                })
            }

            res.status(200).json({
                message: "Thành công",
                data: product,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async create(req,res) {
        try {
            //validate du lieu
            const { error } = createValidator.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                const errors = error.details.map((err) => err.message);
                    return res.status(400).json({
                        message: errors,
                });
            }

            const data = req.body; //lay du lieu ng dung gui len
            const newProduct = await Product.create(data); //luu vao trong database
            res.status(201).json({
                message: "Thanh cong",
                data: newProduct,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async update(req,res) {
        try {
            //validate du lieu
            const { error } = createValidator.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                const errors = error.details.map((err) => err.message);
                    return res.status(400).json({
                        message: errors,
                });
            }
            
            const data = req.body; //lay du lieu nguoi dung gui len
            const id = req.params.id; //lay id product can update

            const updatedProduct = await Product.findByIdAndUpdate(id, data);
            if (!updatedProduct) {
                return res.status(404).json({
                    message: "Not found" 
                })
            }

            res.status(201).json({
                message: "Thanh cong",
                data: updatedProduct,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async delete(req,res) {
        try {
            const id = req.params.id; //lay id product can xoa
            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(404).json({
                    message: "Not found" 
                })
            }

            res.status(200).json({
                message: "Thanh cong"
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

export default ProductController;
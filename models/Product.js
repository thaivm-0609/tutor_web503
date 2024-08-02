import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, require: true},
    price: {type: Number},
    description: {type: String},
    brand: {type: String}
},
{
    timestamps: true, versionKey: false
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;
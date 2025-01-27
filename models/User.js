import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String},
},
{   timestamps: true, versionKeys: false}
)

const User = mongoose.model("User", userSchema);

export default User;
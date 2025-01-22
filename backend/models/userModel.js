import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
        match: [/^[A-Za-z]+$/, 'Name can only contain letters ']
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already exist'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password contain atleast 6 character'],
        max: [12, 'Password contain maximum 12 character'],
       
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required:true,
        default: 'active'
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
        required:true
    }


}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema)

export default UserModel

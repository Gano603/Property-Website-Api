import {Schema,model} from "mongoose";


const UserSchema = new Schema(
    {
        name:{
        type:String,
        required:true},

        email:{
        type:String
        },

        contact:{
        type:String,
        required:true},

        password:{
        type:String,
        },

        registered:{
        type:Boolean,
        default:false
        },

        updatedat:{
        type:Date,
        default:Date.now()
        },

        createdat:{
        type:Date,
        default:Date.now()}
    }
)

export const usermodel = model("Users",UserSchema);
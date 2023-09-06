import {Schema,model} from "mongoose";


const AdSchema = new Schema(
    {
        type:{
        type:String,
        required:true},

        address:{
        type:String,
        required:true},

        city:{
        type:String,
        required:true},

        user:{
            type:Schema.Types.ObjectId,
            ref:"Users"
        },

        price:{
        type:String,
        required:true
        },

        baths:{
        type:Number,
        required:true
        },

        beds:{
        type:Number,
        required:true
        },

        size:{
        type:Number,
        required:true
        },

        features:{
            type:Array,
            items:{
                type:String
            }
        },

        sold:{
            type:Boolean,
            default:false,
        },

        imageData: {
            type:Array,
            items:{
                type:String,
                required:true 
            } 
          },

        createdat:{
        type:Date,
        default:Date.now()}
    }
)

export const admodel = model("Ad",AdSchema);
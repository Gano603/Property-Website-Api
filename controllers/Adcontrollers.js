import jwt from "jsonwebtoken";
import { admodel } from "../models/ad.js";
import { usermodel } from "../models/user.js";
import { respone } from '../utils/features.js';

export const newAd = async (req, res) => {
    try {
      const { type, city, address, size, price, baths, beds, name, property_type, service_type, contact, description, email, features , dfiles} = req.body;
      const { Session } = req.cookies;
      let user = await usermodel.findOne({ email, contact });
      const _id = Session ? { _id: jwt.verify(Session, process.env.DATA_KEY) } : user;
          if (Session || user) {
            await admodel.create({ type, city, address, size, price, description, baths, beds, features, user: _id, imageData:dfiles, service_type});
          } else {
            user = await usermodel.create({ name, contact, email });
            await admodel.create({ type, city, address, size, price, baths, beds, features, user, imageData:dfiles, service_type});
          }
          return respone(res, 201, true, "Ad Created", Session, Session ? "Ad created and user is signed In" : "Ad created but user is not signed In");
  
        }
    catch (error) {
      return respone(res, 404, false, "Internal Server Error"+error);
    }
  }
  

export const getCityAd = async (req,res)=>{
    const {Session} = req.cookies;
    const {city} = req.body;
    const data = await admodel.find({city});
    respone(res,202,true,"Data Retreived",Session,data)

}

export const getAllAds = async (req,res)=>{
    const {Session} = req.cookies;
    const data = await admodel.find();
    respone(res,202,true,"Data Retreived",Session,data)

}

export const deleteAd = async (req,res)=>{
    const {Session} = req.cookies;
    const {_id} = req.body;
    if(Session){
        await admodel.findByIdAndDelete(_id);
        return respone(res,200,true,"Ad Deleted Successfully",Session)
    }
    respone(res,202,false,"Log In First",undefined)

}

export const updateAd = async (req,res)=>{
    const {Session} = req.cookies;
    const {type,city,address,size,price,baths,beds,sold,features,dfiles} = req.body;
    if(Session){
        const {_id} = jwt.verify(Session,process.env.DATA_KEY);
        const user = await admodel.findByIdAndUpdate(_id,{type,city,address,size,price,baths,beds,sold,features,imageData:dfiles});
        
        return respone(res,200,true,"Ad Updated",Session,user)
    }
    respone(res,202,false,"Log In First",undefined)

}
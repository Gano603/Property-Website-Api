import {Router} from "express";
import { deleteAd, getAllAds, getCityAd , newAd, updateAd } from "../controllers/Adcontrollers.js";

export const adrouter = Router();

adrouter.post("/newad",newAd)
adrouter.post("/getadbycity",getCityAd)
adrouter.get("/getallads",getAllAds)
adrouter.put("/updatead",updateAd)
adrouter.delete("/deletead",deleteAd)
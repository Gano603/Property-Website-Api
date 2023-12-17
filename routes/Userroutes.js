import {Router} from 'express'
import { createNewUser, deleteUser, getUser, Login, Logout, updateUser } from '../controllers/Usercontrollers.js';

export const userrouter = Router();

userrouter.post("/newuser",createNewUser);
userrouter.get("/getuser",getUser);
userrouter.put("/updateuser",updateUser);
userrouter.delete("/deleteuser",deleteUser);
userrouter.get("/logout",Logout);
userrouter.post("/login",Login);
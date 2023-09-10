import {Router} from 'express'
import { createNewUser, deleteUser, getUser, Login, Logout, test, updateUser } from '../controllers/Usercontrollers.js';

export const userrouter = Router();

userrouter.get("/test",test);
userrouter.post("/newuser",createNewUser);
userrouter.get("/getuser",getUser);
userrouter.put("/updateuser",updateUser);
userrouter.delete("/deleteuser",deleteUser);
userrouter.get("/logout",Logout);
userrouter.post("/login",Login);
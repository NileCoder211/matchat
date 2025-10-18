import express from "express";
const router = express.Router();
import {signup} from "../controllers/auth.controller.js"


router.post("/signup", signup);

router.post("/signin", (req, res)=>{
    res.send("signin route");
});

router.post("/signout", (req, res)=>{
    res.send("signout route");
});



export default router;
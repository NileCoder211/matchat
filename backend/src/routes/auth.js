import express from "express";
const router = express.Router();


router.get("/signup", (req, res)=>{
     console.log("Signup request body:", req.body);
     try {

    res.send("signup route");
     } catch (error) {
        console.log("error in signup route:", error);
        res.send("error in signup route:", error.message);
     }
});

router.post("/signin", (req, res)=>{
    res.send("signin route");
});

router.post("/signout", (req, res)=>{
    res.send("signout route");
});



export default router;
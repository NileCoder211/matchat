
import express from "express";
import { ENV } from "./lib/env.js";
import authRoutes from "./routes/auth.js";
import path from "path";
import { connectionDB } from "./lib/db.js";



const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3003;

app.use(express.json());
app.use(express.json());
app.use("/api/auth", authRoutes);

// make ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get( (req, res)=>{
        res.sendFile(path.join(__dirname, "..frontend/dist/index.html"));
    })
}


app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
    connectionDB();
});

import express from "express";
import { ENV } from "./lib/env.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectionDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from "./lib/socket.js";



const __dirname = path.resolve();
const PORT = ENV.PORT || 3003;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors ({origin: ENV.CLIENT_URL, credentials: true}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (_, res)=>{
        res.sendFile(path.join(__dirname, "../frontend/index.html"));
    })
}

// "matchat": "file:..",
server.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
    connectionDB();
});

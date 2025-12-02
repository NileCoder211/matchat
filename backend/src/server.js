
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
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Your local frontend
      "https://matchat-jepjc.sevalla.app/", // Your production frontend
    ],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// In src/server.js (or equivalent backend entry file)

// Define the root directory one level up from the server's running location (src/)
const ROOT_DIR = path.resolve();

// ... existing code ...

// make ready for deployment
if(ENV.NODE_ENV === "production"){
    // 1. Serve static files from the correct path.
    // We assume frontend/dist is now at ../dist relative to where your code lives
    app.use(express.static(path.join(ROOT_DIR, "frontend", "dist")))
    
    // 2. Catch all other requests and send index.html
    app.get("*", (req, res)=>{
        res.sendFile(path.join(ROOT_DIR, "frontend", "dist", "index.html"));
    })
}

// "matchat": "file:..",
server.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
    connectionDB();
});

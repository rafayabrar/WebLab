import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import tripRouter from "./routes/tripRoute.js";
import adminModel from "./models/adminModel.js";

// Load environment variables from .env file
dotenv.config();

// app configuration
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/trips", tripRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.post("/admin-signin", async function (req, res) {
    try {
        const admin = await adminModel.findOne({ username: req.body.username });

        if (!admin || admin.password !== req.body.password) {
            throw new Error("Invalid username or password");
        }
        res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
import express from 'express';
import cors from 'cors';

const app = express()

//Basic Configurations(express)

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({extended: true, limit: "32kb"}))
app.use(express.static("public"))


// basic xors configurations

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Importing Routes

import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);

app.get("/", (req, res) => {
    res.send("Hello World")
})

export default app;
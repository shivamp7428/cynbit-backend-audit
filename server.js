import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import testRoutes from "./routes/testRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import errorTestRoutes from "./routes/errorTestRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    })
);
app.use("/api", rateLimiter);
app.use("/api", testRoutes);
app.use("/api", errorTestRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Cynbit Audit API is running"
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { connectDB } from "./config/database";
import userRoutes from "./routes/userRoutes";
import geoDataRoutes from "./routes/geoDataRoutes";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/geodata", geoDataRoutes);

// Error handling
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
  }
);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;

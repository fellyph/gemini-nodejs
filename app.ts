import express, { Request, Response } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import riversRouter from "./routes/rivers";

const app = express();
const port: number = 3000;

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", riversRouter);

// Simple HTML form route
app.get("/", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`);
});

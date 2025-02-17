import express, { Request, Response } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import riversRouter from "./routes/rivers";

const app = express();
const port: number = 3000;

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Main landing page
app.get("/", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

// Exercise routes
app.use("/api", riversRouter);

// Rivers exercise page
app.get("/rivers", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "views/rivers.html"));
});

// Image analysis exercise page
app.get("/image-analysis", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "views/image-analysis.html"));
});

// Document analysis exercise page
app.get("/document-analysis", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "views/document-analysis.html"));
});

// Smart search exercise page
app.get("/smart-search", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "views/smart-search.html"));
});

// Chat demo exercise page
app.get("/chat", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "views/chat.html"));
});

// Start server
app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`);
    console.log(`Open http://localhost:${port} to view the application`);
});

import express, { Request, Response } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import riversRouter from "./routes/rivers";
import groundingRouter from "./routes/ask-search";

const app = express();
const port: number = 3000;

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);
const rootDir: string = path.join(__dirname, "..");

// Middleware
app.use(express.json());
app.use(express.static(path.join(rootDir, "public")));

// Main landing page
app.get("/", (req: Request, res: Response): void => {
    res.sendFile(path.join(rootDir, "views/index.html"));
});

// Exercise routes
app.use("/api", riversRouter);
app.use("/api", groundingRouter);

// Rivers exercise page
app.get("/rivers", (req: Request, res: Response): void => {
    res.sendFile(path.join(rootDir, "views/rivers.html"));
});

// Rivers exercise page
app.get("/grounding-search", (req: Request, res: Response): void => {
    res.sendFile(path.join(rootDir, "views/grounding-search.html"));
});

// Image analysis exercise page
app.get("/image-analysis", (req: Request, res: Response): void => {
    res.sendFile(path.join(rootDir, "views/image-analysis.html"));
});

// Document analysis exercise page
app.get("/document-analysis", (req: Request, res: Response): void => {
    res.sendFile(path.join(rootDir, "views/document-analysis.html"));
});

// Smart search exercise page
app.get("/smart-search", (req: Request, res: Response): void => {
    res.sendFile(path.join(rootDir, "views/smart-search.html"));
});

// Chat demo exercise page
app.get("/chat", (req: Request, res: Response): void => {
    res.sendFile(path.join(rootDir, "views/chat.html"));
});

// Start server
app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`);
    console.log(`Open http://localhost:${port} to view the application`);
});

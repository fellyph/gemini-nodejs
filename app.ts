import express, { Request, Response } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port: number = 3000;

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// Simple HTML form route
app.get("/", (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`);
});

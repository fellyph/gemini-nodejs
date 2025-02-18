import express, { Request, Response, NextFunction } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';

// Route imports
import pageRoutes from './routes/pages';
import riversRouter from './routes/rivers';
import groundingRouter from './routes/ask-search';
import imageAnalysisRouter from './routes/analyze-book';

// Configuration
const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);
const rootDir: string = path.join(__dirname, '..');

// View engine setup
const configureViewEngine = (): void => {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(expressLayouts);
    app.set('layout', 'layouts/main');
};

// Middleware setup
const configureMiddleware = (): void => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.static(path.join(rootDir, 'public')));
};

// Route setup
const configureRoutes = (): void => {
    // Page routes
    app.use('/', pageRoutes);

    // API routes
    app.use('/api', riversRouter);
    app.use('/api', groundingRouter);
    app.use('/api', imageAnalysisRouter);
};

// Error handling
const configureErrorHandling = (): void => {
    // 404 handler
    app.use((req: Request, res: Response): void => {
        const error = new Error('Page Not Found') as any;
        error.status = 404;
        res.status(404).render('error', {
            title: '404 - Page Not Found',
            message: "The page you're looking for doesn't exist.",
            error: error,
            stack: error.stack,
        });
    });

    // Global error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
        console.error(err.stack);

        // Set default status code if not set
        const statusCode = err.status || 500;
        const errorMessage =
            statusCode === 500
                ? 'Something went wrong on our end.'
                : err.message || 'An error occurred.';

        res.status(statusCode).render('error', {
            title: `${statusCode} - ${statusCode === 500 ? 'Server Error' : 'Error'}`,
            message: errorMessage,
            error: process.env.NODE_ENV !== 'production' ? err : null,
            stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
        });
    });
};

// Initialize application
const initializeApp = (): void => {
    configureViewEngine();
    configureMiddleware();
    configureRoutes();
    configureErrorHandling();

    app.listen(port, (): void => {
        console.log(`Server listening on port ${port}`);
        console.log(`Open http://localhost:${port} to view the application`);
    });
};

// Start the application
initializeApp();

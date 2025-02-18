import { Router, Request, Response } from 'express';

const router = Router();

// Main landing page
router.get('/', (req: Request, res: Response): void => {
    res.render('index', { title: 'Home' });
});

// Rivers exercise page
router.get('/rivers', (req: Request, res: Response): void => {
    res.render('rivers', { title: 'River Analysis' });
});

// Grounding search page
router.get('/grounding-search', (req: Request, res: Response): void => {
    res.render('grounding-search', { title: 'Grounding Search' });
});

// Image analysis exercise page
router.get('/image-analysis', (req: Request, res: Response): void => {
    res.render('image-analysis', { title: 'Image Analysis' });
});

// Document analysis exercise page
router.get('/document-analysis', (req: Request, res: Response): void => {
    res.render('document-analysis', { title: 'Document Analysis' });
});

// Smart search exercise page
router.get('/smart-search', (req: Request, res: Response): void => {
    res.render('smart-search', { title: 'Smart Search' });
});

// Chat demo exercise page
router.get('/chat', (req: Request, res: Response): void => {
    res.render('chat', { title: 'Chat Demo' });
});

export default router;

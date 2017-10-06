import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.get('/code-challenge', (req, res) => {
    const index = fs.readFileSync('./src/views/index.html');
    res.render(index.toString());
});

export default router;
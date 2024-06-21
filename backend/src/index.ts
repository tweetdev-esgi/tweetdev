import express from 'express';
import bodyParser from 'body-parser';
import { executeCode, SupportedProgrammingLanguage } from './executeCode';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/executeCode', async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: 'Code et langage requis.' });
    }

    try {
        const result = await executeCode(code, language as SupportedProgrammingLanguage);
        res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

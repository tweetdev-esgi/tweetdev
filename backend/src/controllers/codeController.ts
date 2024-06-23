import { Request, Response } from 'express';
import { saveCodeService, executeCodeService } from '../services/codeService';

const saveCode = async (req: Request, res: Response) => {
    const { name, code, language } = req.body;
    try {
        await saveCodeService({ name, code, language });
        res.status(200).send('Code saved successfully');
    } catch (error) {
        console.error('Error saving code:', error); // Enregistrement détaillé de l'erreur
        res.status(500).send('Error saving code');
    }
};

const executeCode = async (req: Request, res: Response) => {
    const { language, code } = req.body;
    try {
        const result = await executeCodeService({ language, code });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error executing code:', error); // Enregistrement détaillé de l'erreur
        res.status(500).send('Error executing code');
    }
};

export {
    saveCode,
    executeCode,
};

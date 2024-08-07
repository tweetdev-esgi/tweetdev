import { Request, Response } from 'express';
import { saveCodeService } from '../services/codeService';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const saveCode = async (req: Request, res: Response) => {
    const { name, code, language } = req.body;
    try {
        await saveCodeService({ name, code, language });
        res.status(200).send('Code saved successfully');
    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).send('Error saving code');
    }
};

export const executeCode = async (req: Request, res: Response) => {
    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).json({ message: 'Language and code are required' });
    }

    const uniqueId = Date.now(); // Generate a unique ID based on the current timestamp
    const fileName = `code_${uniqueId}.${language}`;

    let folderPath = '';

    switch (language) { //Nommage des langages incorrect /!\ TODO: A corriger
        case 'javascript':
            folderPath = path.join(__dirname, '../../code/javascript');
            break;
        case 'python':
            folderPath = path.join(__dirname, '../../code/python');
            break;
        default:
            return res.status(400).json({ message: 'Unsupported language' });
    }

    const filePath = path.join(folderPath, fileName);

    try {
        // Write the code to a temporary file
        fs.writeFileSync(filePath, code);

        // Determine the appropriate Docker run command based on the language
        let command = '';
        switch (language) { //Nommage des langages incorrect /!\ TODO: A corriger
            case 'javascript':
                command = `docker run --rm -v ${filePath}:/app/${fileName} js-runtime node ./${fileName}`;
                break;
            case 'python':
                command = `docker run --rm -v ${filePath}:/app/${fileName} python-runtime python ./${fileName}`;
                break;
            default:
                return res.status(400).json({ message: 'Unsupported language' });
        }

        // Execute the code inside the Docker container
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ message: stderr });
            }
            return res.json({ output: stdout });
        });
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({ message: 'Error executing code' });
    }
};

export {
    saveCode,
};

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

    switch (language) {
        case 'js':
            folderPath = path.join(__dirname, '../../code/javascript');
            break;
        case 'ts':
            folderPath = path.join(__dirname, '../../code/typescript');
            break;
        case 'py':
            folderPath = path.join(__dirname, '../../code/python');
            break;
        case 'java':
            folderPath = path.join(__dirname, '../../code/java');
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
        switch (language) {
            case 'js':
                command = `docker run --rm -v ${folderPath}:/app backend /app/runner.sh javascript /app/${fileName}`;
                break;
            case 'ts':
                command = `docker run --rm -v ${folderPath}:/app backend /app/runner.sh typescript /app/${fileName}`;
                break;
            case 'py':
                command = `docker run --rm -v ${folderPath}:/app backend /app/runner.sh python /app/${fileName}`;
                break;
            case 'java':
                command = `docker run --rm -v ${folderPath}:/app backend /app/runner.sh java /app/${fileName}`;
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

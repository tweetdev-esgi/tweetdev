import {Request, Response} from 'express';
import {saveCodeService} from '../services/codeService';
import fs from 'fs';
import path from "path";
import {exec} from "child_process";

const saveCode = async (req: Request, res: Response) => {
    const {name, code, language} = req.body;
    try {
        await saveCodeService({name, code, language});
        res.status(200).send('Code saved successfully');
    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).send('Error saving code');
    }
};

export const executeCode = async (req: Request, res: Response) => {
    const {language, code} = req.body;

    if (!language || !code) {
        return res.status(400).json({message: "Language and code are required"});
    }

    const fileName = `code.${language}`;
    const filePath = path.join('/app', fileName);

    try {
        // eecrire le code dans un fichier temporaire
        fs.writeFileSync(filePath, code);

        let command = '';
        switch (language) {
            case 'javascript':
                command = `docker-compose run --rm javascript node /app/runner.js`;
                break;
            case 'typescript':
                command = `docker-compose run --rm typescript ts-node /app/runner.ts`;
                break;
            case 'python':
                command = `docker-compose run --rm python python /app/runner.py`;
                break;
            case 'java':
                command = `docker-compose run --rm java java /app/Runner`;
                break;
            default:
                return res.status(400).json({message: "Unsupported language"});
        }// docker run avec le nom de mon code plus le language
        //'docker', 'run', '--rm', '-v', chemain_dans_ta_machine', 'image_docker_name', 'node' container_path

        // executer le code dans le conteneur Docker
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({message: stderr});
            }
            return res.json({output: stdout});
        });
    } catch (error) {
        return res.status(500).json({message: "Error executing code"});
    }
};

export {
    saveCode,
};

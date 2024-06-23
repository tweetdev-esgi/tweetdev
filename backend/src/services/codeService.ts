import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import CodeModel from '../models/codeModel';

const saveCodeService = async ({ name, code, language }: { name: string, code: string, language: string }) => {
    const newCode = new CodeModel({ name, code, language });
    await newCode.save();
};

const executeCodeService = async ({ language, code }: { language: string, code: string }) => {
    const filePath = path.join(__dirname, '..', '..', 'code', `code.${language}`);
    fs.writeFileSync(filePath, code);

    let dockerService = '';
    switch (language) {
        case 'javascript':
            dockerService = 'javascript';
            break;
        case 'typescript':
            dockerService = 'typescript';
            break;
        case 'python':
            dockerService = 'python';
            break;
        case 'java':
            dockerService = 'java';
            break;
        default:
            throw new Error('Unsupported language');
    }

    return new Promise((resolve, reject) => {
        exec(`docker-compose run --rm ${dockerService}`, { cwd: path.join(__dirname, '..', '..') }, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
};

export {
    saveCodeService,
    executeCodeService,
};

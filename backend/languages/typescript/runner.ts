import { exec } from 'child_process';
import fs from 'fs';

fs.readFile('/app/code.ts', 'utf8', (err, code) => {
    if (err) {
        console.error('Error reading code file:', err);
        process.exit(1);
    }

    exec(`ts-node -e "${code}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            process.exit(1);
        } else {
            console.log(`Output: ${stdout}`);
        }
    });
});

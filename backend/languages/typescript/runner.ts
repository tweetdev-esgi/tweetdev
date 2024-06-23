import { exec } from 'child_process';
import * as fs from 'fs';

const code = fs.readFileSync('/app/code.ts', 'utf8');

exec(`ts-node -e "${code}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${stderr}`);
    } else {
        console.log(`Output: ${stdout}`);
    }
});

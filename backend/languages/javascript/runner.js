const { exec } = require('child_process');
const fs = require('fs');

const code = fs.readFileSync('/app/code.js', 'utf8');

exec(`node -e "${code}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${stderr}`);
    } else {
        console.log(`Output: ${stdout}`);
    }
});

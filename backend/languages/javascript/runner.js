const { exec } = require('child_process');
const fs = require('fs');

fs.readFile('/app/code.js', 'utf8', (err, code) => {
    if (err) {
        console.error('Error reading code file:', err);
        process.exit(1);
    }

    exec(`node -e "${code}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            process.exit(1);
        } else {
            console.log(`Output: ${stdout}`);
        }
    });
});

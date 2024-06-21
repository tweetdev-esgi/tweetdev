"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = void 0;
const child_process_1 = require("child_process");
/**
 * Exécute du code dans un conteneur Docker pour le langage de programmation spécifié.
 * @param code Le code à exécuter.
 * @param language Le langage de programmation dans lequel exécuter le code.
 * @returns Une promesse qui résout avec la sortie de l'exécution ou rejette avec une erreur.
 */
function executeCode(code, language) {
    return new Promise((resolve) => {
        // Échapper les guillemets simples dans le code pour une exécution shell sûre
        const sanitizedCode = code.replace(/'/g, "'\\''").replace(/"/g, '\\"');
        let command = "";
        switch (language) {
            case "javascript":
                command = `docker run --rm -v $(pwd):/usr/src/myapp -w /usr/src/myapp node:alpine node -e "${sanitizedCode}"`;
                break;
            case "rust":
                command = `docker run --rm -v $(pwd):/usr/src/myapp -w /usr/src/myapp rust:latest bash -c "printf '%s' '${sanitizedCode}' > main.rs && rustc main.rs && ./main"`;
                break;
            case "zig":
                command = `docker run --rm -v $(pwd):/usr/src/myapp -w /usr/src/myapp ziglang/zig bash -c "printf '%s' '${sanitizedCode}' > main.zig && zig build-exe main.zig && ./main"`;
                break;
            case "python":
                command = `docker run --rm -v $(pwd):/usr/src/myapp -w /usr/src/myapp python:alpine python -c "${sanitizedCode}"`;
                break;
            default:
                resolve({
                    status: "error",
                    output: "",
                    error: `Langage non supporté : ${language}`,
                });
                return;
        }
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Erreur d'exécution du code :", stderr);
                resolve({
                    status: "error",
                    output: "",
                    error: stderr || error.message,
                });
            }
            else {
                resolve({
                    status: "success",
                    output: stdout,
                    error: undefined,
                });
            }
        });
    });
}
exports.executeCode = executeCode;

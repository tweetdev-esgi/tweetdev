import CodeModel from '../models/codeModel';

// Service pour sauvegarder le code
const saveCodeService = async ({ name, code, language }: { name: string, code: string, language: string }) => {
    const newCode = new CodeModel({ name, code, language });
    await newCode.save();
};

// Service pour exécuter le code
const executeCodeService = async ({ language, code }: { language: string, code: string }) => {
    // Implémentez ici la logique pour exécuter le code (ex: via Docker ou un autre mécanisme)
    // Pour l'instant, nous retournons un exemple de réponse
    return {
        run: {
            stdout: 'Execution output',
            stderr: '',
            output: 'Execution output',
            code: 0,
        },
    };
};
//
export {
    saveCodeService,
    executeCodeService,
};

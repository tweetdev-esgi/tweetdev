import mongoose, { Model } from "mongoose"
import { Program, ProgramModel } from "../models"

import * as express from "express"
import { Router, Response, Request } from "express"
import { checkBody, checkUserRole, checkUserToken } from "../middleware"
import { checkQuery } from "../middleware/query.middleware"
import { RolesEnums } from "../enums"

const path = require('path');
const fs = require('fs')
const Docker = require('dockerode')
const docker = new Docker();


export class ProgramController {

    readonly path: string
    readonly model: Model<Program>

    constructor(){
        this.path = "/program"
        this.model = ProgramModel
    }

    getAllPrograms = async (req:Request, res:Response): Promise<void> => {
        const programs = await ProgramModel.find()
        res.status(200).json(programs)
        return 
    }
    readonly paramsNewProgram = {
        "name":"string",
        "content" : "string",
        "inputFileType": "string",
        "outputFileType": "string",
        "language": "string"
    }

    newProgram = async (req: Request, res: Response): Promise<void> => {
        const newPost = await ProgramModel.create({
            name: req.body.name,
            content:  req.body.content ,
            like: [],
            comments: [],
            inputFileType:req.body.inputFileType,
            outputFileType:req.body.outputFileType,
            username : req.user?.username,
            creationDate: new Date(),
            language: req.body.language,
        })
        
        res.status(201).json(newPost)
        return 
    }

    readonly paramsUpdateProgram = {
        "name": "string",
        "content": "string",
        "inputFileType": "string",
        "outputFileType": "string",
        "language": "string"
    }

    updateProgram = async (req: Request, res: Response): Promise<void> => {
        const id = req.query.id as string;
        const username = req.user?.username;
    
        if (!username) {
            res.status(401).json({ message: 'You are not logged in' });
            return;
        }
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid program ID format' });
            return;
        }
    
        try {
            const program = await ProgramModel.findById(id);
    
            if (!program) {
                res.status(404).json({ message: 'Program not found' });
                return;
            }
    
            if (program.username !== username) {
                res.status(403).json({ message: 'You do not have permission to update this program' });
                return;
            }
    
            const updateData = {
                name: req.body.name,
                content: req.body.content,
                inputFileType: req.body.inputFileType,
                outputFileType: req.body.outputFileType,
                language: req.body.language,
            };
    
            const updatedProgram = await ProgramModel.findByIdAndUpdate(id, updateData, { new: true });
    
            if (updatedProgram) {
                res.status(200).json(updatedProgram);
            } else {
                res.status(404).json({ message: "Program not found" });
            }
        } catch (error) {
            console.error('Error updating program:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    deleteProgram = async (req: Request, res: Response): Promise<void> => {
        const id = req.query.id as string;
        const program = await ProgramModel.findById(id)

        if (program) {
            if (program.username === req.user?.username) {
                await ProgramModel.findByIdAndDelete(id)
                res.status(200).json({ message: "Program deleted successfully" })
            } else {
                res.status(403).json({ message: "You are not authorized to delete this program" })
            }
        } else {
            res.status(404).json({ message: "Program not found" })
        }
    }
    isProgramDeletable = async (req: Request, res: Response): Promise<void> => {
        const id = req.query.id as string;
        const username = req.user?.username;
    
        if (!username) {
            res.status(401).json({ message: 'You are not logged in' });
            return;
        }
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid program ID format' });
            return;
        }
    
        try {
            const program = await ProgramModel.findById(id);
    
            if (!program) {
                res.status(404).json({ message: 'program not found' });
                return;
            }
    
            if (program.username === username) {
                res.status(200).json(true);
                return;
            }
    
            res.status(200).json(false);
        } catch (error) {
            console.error('Error retrieving program:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getOneProgram = async (req: Request, res: Response): Promise<void> => {
        const id = req.query.id as string;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid program ID format' })
            return
        }
    
        try {
            const program = await ProgramModel.findById(id)
    
            if (program) {
                res.status(200).json(program)
            } else {
                res.status(404).json({ message: 'Program not found' })
            }
        } catch (error) {
            console.error('Error retrieving program:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    sanitizeOutput = (output: string): string => {
        // Remove control characters (non-printable characters)
        return output.replace(/[\x00-\x1F\x7F]/g, '').trim();
    };
    executeCode = async (language: string, code: string): Promise<string> => {
        const scriptFile = `script.${language === 'python' ? 'py' : 'js'}`;
        const scriptPath = path.join(__dirname, 'scripts', scriptFile);
    
        if (!fs.existsSync(path.join(__dirname, 'scripts'))) {
            fs.mkdirSync(path.join(__dirname, 'scripts'));
        }
    
        fs.writeFileSync(scriptPath, code, { encoding: 'utf8' });
    
        const container = await docker.createContainer({
            Image: 'multi-language-executor',
            AttachStdout: true,
            AttachStderr: true,
            Cmd: [language],
            HostConfig: {
                Binds: [`${path.join(__dirname, 'scripts')}:/scripts`]
            }
        });
    
        await container.start();
    
        let output = '';
        const logStream = await container.logs({
            stdout: true,
            stderr: true,
            follow: true
        });
    
        logStream.on('data', (data: Buffer) => {
            output += data.toString('utf8');
        });
    
        await new Promise((resolve) => {
            logStream.on('end', resolve);
        });
    
        await container.wait();
        await container.remove();
        fs.unlinkSync(scriptPath);
    
        return this.sanitizeOutput(output); // Ensure sanitizeOutput function is defined
    };

    executeProgram = async (req: Request, res: Response): Promise<void> => {
        const { language, code } = req.body;
    
        if (!language || !code) {
            res.status(400).json({ message: 'Language and code are required' });
            return;
        }
    
        if (!['python', 'javascript'].includes(language)) {
            res.status(400).json({ message: 'Invalid language specified' });
            return;
        }
    
        try {
            const output = await this.executeCode(language, code);
            res.status(200).json({ output });
        } catch (error) {
            console.error('Error executing code:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), this.getAllPrograms.bind(this))
        router.get('/one', checkUserToken(), this.getOneProgram.bind(this))

        router.get('/is-deletable', checkUserToken(), this.isProgramDeletable.bind(this))
        router.post('/', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), checkBody(this.paramsNewProgram), this.newProgram.bind(this))
        router.put('/', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), checkBody(this.paramsUpdateProgram), this.updateProgram.bind(this))
        router.delete('/', checkUserToken(), checkUserRole(RolesEnums.guest), this.deleteProgram.bind(this))
        router.post('/execute', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), this.executeProgram.bind(this))
        return router
    }
}
import { SaveCodeModel } from "../models/saveCode.model";
import * as express from "express";
import { Router, Response, Request } from "express";
import { checkBody, checkUserToken } from "../middleware";
import {Model} from "mongoose";

export class SaveCodeController {
    readonly path: string;
    readonly model: Model<any>;

    constructor() {
        this.path = "/save-code";
        this.model = SaveCodeModel;
    }

    saveCode = async (req: Request, res: Response): Promise<void> => {
        const { name, code, language } = req.body;
        try {
            const newCode = new SaveCodeModel({ name, code, language });
            await newCode.save();
            res.status(200).send('Code saved successfully');
        } catch (error) {
            console.error('Error saving code:', error);
            res.status(500).send('Error saving code');
        }
    };

    deleteCode = async (req: Request, res: Response): Promise<void> => {
        const name = req.query.name as string;
        try {
            const code = await SaveCodeModel.findOne({ name });
            if (!code) {
                res.status(404).json({ message: 'Code not found' });
                return;
            }
            await SaveCodeModel.deleteOne({ name });
            res.status(200).json({ message: `Code ${name} deleted` });
        } catch (error) {
            console.error('Error deleting code:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getAllSaveCodes = async (req: Request, res: Response): Promise<void> => {
        try {
            const codes = await SaveCodeModel.find();
            res.status(200).json(codes);
        } catch (error) {
            console.error('Error retrieving codes:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getSaveCodeByName = async (req: Request, res: Response): Promise<void> => {
        const name = req.query.name as string;
        try {
            const code = await SaveCodeModel.findOne({ name });
            if (!code) {
                res.status(404).json({ message: 'Code not found' });
                return;
            }
            res.status(200).json(code);
        } catch (error) {
            console.error('Error retrieving code:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    buildRouter = (): Router => {
        const router = express.Router();
        router.post('/save', checkUserToken(), express.json(), checkBody(this.createSaveCodeBody), this.saveCode.bind(this));
        router.delete('/delete', checkUserToken(), this.deleteCode.bind(this));
        router.get('/all', checkUserToken(), this.getAllSaveCodes.bind(this));
        router.get('/by-name', checkUserToken(), this.getSaveCodeByName.bind(this));

        return router;
    }

    readonly createSaveCodeBody = {
        "name": "string",
        "code": "string",
        "language": "string",
    }
}

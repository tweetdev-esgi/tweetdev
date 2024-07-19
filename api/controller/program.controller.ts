import { Model } from "mongoose"
import { Program, ProgramModel } from "../models"

import * as express from "express"
import { Router, Response, Request } from "express"
import { checkBody, checkUserRole, checkUserToken } from "../middleware"
import { checkQuery } from "../middleware/query.middleware"
import { RolesEnums } from "../enums"

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
            content: "```" +req.body.content +"```",
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
        const updateData = {
            name: req.body.name,
            content: "```" + req.body.content + "```",
            inputFileType: req.body.inputFileType,
            outputFileType: req.body.outputFileType,
            language: req.body.language,
            
        }

        const updatedProgram = await ProgramModel.findByIdAndUpdate(id, updateData, { new: true })

        if (updatedProgram) {
            res.status(200).json(updatedProgram)
        } else {
            res.status(404).json({ message: "Program not found" })
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

    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), this.getAllPrograms.bind(this))
        router.post('/', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), checkBody(this.paramsNewProgram), this.newProgram.bind(this))
        router.put('/', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), checkBody(this.paramsUpdateProgram), this.updateProgram.bind(this))
        router.delete('/', checkUserToken(), checkUserRole(RolesEnums.guest), this.deleteProgram.bind(this))

        return router
    }
}
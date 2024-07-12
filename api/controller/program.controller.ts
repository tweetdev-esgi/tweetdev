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
        "content" : "string"
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
        })
        
        res.status(201).json(newPost)
        return 
    }
    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), this.getAllPrograms.bind(this))
        router.post('/', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), checkBody(this.paramsNewProgram), this.newProgram.bind(this))

        return router
    }
}
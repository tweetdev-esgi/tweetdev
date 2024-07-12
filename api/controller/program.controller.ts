import { Model } from "mongoose"
import { Program, ProgramModel } from "../models"

import * as express from "express"
import { Router, Response, Request } from "express"
import { checkBody, checkUserToken } from "../middleware"
import { checkQuery } from "../middleware/query.middleware"

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

 


    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), this.getAllPrograms.bind(this))

        return router
    }
}
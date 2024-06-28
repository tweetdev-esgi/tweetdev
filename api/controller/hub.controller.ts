import { Model } from "mongoose"
import { Hub, HubModel, PostModel, UserModel } from "../models"

import * as express from "express"
import { Router, Response, Request } from "express"
import { checkBody, checkUserToken } from "../middleware"
import { checkQuery } from "../middleware/query.middleware"

export class HubController {

    readonly path: string
    readonly model: Model<Hub>

    constructor(){
        this.path = "/hub"
        this.model = HubModel
    }

    getAllHubs = async (req:Request, res:Response): Promise<void> => {
        const hubs = await HubModel.find()
        res.status(200).json(hubs)
        return 
    }

    readonly createHubBody = {
        "name" : "string",
        "description" : "string",
        "profileImageUrl" : "string",
        "coverImageUrl" : "string",
    }

    createHub = async (req:Request, res:Response): Promise<void> => {

        try {
            const name = req.body.name;
            const description = req.body.description;
            const profileImageUrl = req.body.profileImageUrl;
            const coverImageUrl = req.body.coverImageUrl;
            const creationDate = new Date();


        const hub = await HubModel.create({
            name:name,
            description:description,
            profileImageUrl:profileImageUrl,
            coverImageUrl:coverImageUrl,
            creationDate:creationDate
        })
        res.json(hub)
            }catch(err: any){
                    if (err.name === 'MongoServerError' && err.code === 11000) {
              const duplicatedField = Object.keys(err.keyValue)[0]; 
              const errorMessage = duplicatedField === 'name'
                ? 'The username is already in use.'
                : 'A unique field is already in use.';
              
            res.status(409).json({ message: errorMessage})
        
        }else{
            res.status(500).end()
        
        }
    }}


    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), this.getAllHubs.bind(this))
        router.post('/create', checkUserToken(),express.json(),checkBody(this.createHubBody), this.createHub.bind(this))
        return router
    }
}
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

    getHubByName = async (req:Request, res:Response): Promise<void> => {
        const name = req.query.name as string;

        try {
            const hub = await HubModel.findOne({ name });
    
            if (!hub) {
                res.status(404).json({ message: 'Hub not found' });
                return;
            }
    
    
            res.status(200).json(hub);
        } catch (error) {
            console.error('Error retrieving hub:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    readonly createHubBody = {
        "name" : "string",
        "description" : "string",
        "profileImageUrl" : "string",
        "coverImageUrl" : "string",
    }

    createHub = async (req:Request, res:Response): Promise<void> => {
        if(req.user)
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
            creationDate:creationDate,
            users:[req.user.username]
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


    getHubsByUsername = async (req:Request, res:Response): Promise<void> => {
        const users = req.query.username as string;

        try {
            const hub = await HubModel.find({ users });
    
            if (!hub) {
                res.status(404).json({ message: 'Hub not found' });
                return;
            }
    
    
            res.status(200).json(hub);
        } catch (error) {
            console.error('Error retrieving hub:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    getHubPosts = async (req:Request, res:Response): Promise<void> => {
        const hubByName = req.query.name as string;

        try {
            const hub = await HubModel.find({ hubByName });
    
            if (!hub) {
                res.status(404).json({ message: 'Hub not found' });
                return;
            }
    
    
            res.status(200).json(await PostModel.find({ hubname:req.query.name}));

        } catch (error) {
            console.error('Error retrieving hub:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), this.getAllHubs.bind(this))
        router.get('/all', checkUserToken(), this.getHubsByUsername.bind(this))
        router.post('/create', checkUserToken(),express.json(),checkBody(this.createHubBody), this.createHub.bind(this))
        router.get('/by-name', checkUserToken(), this.getHubByName.bind(this))
        router.get('/posts', checkUserToken(), this.getHubPosts.bind(this))

        return router
    }
}
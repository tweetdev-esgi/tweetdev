import { Model } from "mongoose"
import { Workflow, WorkflowModel } from "../models"

import * as express from "express"
import { Router, Response, Request } from "express"
import { checkBody, checkUserRole, checkUserToken } from "../middleware"
import { checkQuery } from "../middleware/query.middleware"
import { RolesEnums } from "../enums"

const workflowSample={
    "nodes": [
        {
            "id": "1",
            "type": "run-node",
            "data": {
                "label": "Run"
            },
            "position": {
                "x": -264,
                "y": 20
            },
            "width": 90,
            "height": 90,
            "selected": false,
            "positionAbsolute": {
                "x": -264,
                "y": 20
            },
            "dragging": false
        },
        {
            "id": "2",
            "type": "upload-node",
            "data": {
                "label": "Upload"
            },
            "position": {
                "x": -88,
                "y": 32
            },
            "width": 90,
            "height": 90,
            "selected": false,
            "positionAbsolute": {
                "x": -88,
                "y": 32
            },
            "dragging": false
        },
        {
            "id": "3",
            "type": "code-node",
            "data": {
                "label": "Code"
            },
            "position": {
                "x": 348,
                "y": 34
            },
            "width": 90,
            "height": 90,
            "selected": false,
            "positionAbsolute": {
                "x": 348,
                "y": 34
            },
            "dragging": false
        },
        {
            "id": "4",
            "type": "finish-node",
            "data": {
                "label": "Finish"
            },
            "position": {
                "x": 600,
                "y": 0
            },
            "width": 90,
            "height": 90,
            "positionAbsolute": {
                "x": 600,
                "y": 0
            }
        },
        {
            "id": "dndnode_0",
            "type": "code-node",
            "position": {
                "x": 159.4923573462745,
                "y": 10.424092256959284
            },
            "data": {
                "label": "my first program"
            },
            "width": 90,
            "height": 90,
            "selected": true,
            "positionAbsolute": {
                "x": 159.4923573462745,
                "y": 10.424092256959284
            },
            "dragging": false
        }
    ],
    "edges": [],
    "viewport": {
        "x": 318.50382132686275,
        "y": 319.41295387152036,
        "zoom": 0.5
    }
}

export class WorkflowController {

    readonly path: string
    readonly model: Model<Workflow>

    constructor(){
        this.path = "/workflow"
        this.model = WorkflowModel
    }

    getAllWorkflows = async (req:Request, res:Response): Promise<void> => {
        const workflows = await WorkflowModel.find()
        res.status(200).json(workflows)
        return 
    }
    readonly workflowsNewProgram = {
        "content" : "string",
        "language":"string"
    }

    newWorkflow = async (req: Request, res: Response): Promise<void> => {
        const newWorkflow = await WorkflowModel.create({
            name: req.body.name,
            content: workflowSample,
            username : req.user?.username,
            language : req.body.language,
            creationDate: new Date(),
            versions : [{
                name:"1.O",
                content: workflowSample,
                lastUpdated: new Date(),
                creationDate: new Date()
            }]
        })
        
        res.status(201).json(newWorkflow)
        return 
    }
    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), this.getAllWorkflows.bind(this))
        router.post('/', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), checkBody(this.workflowsNewProgram), this.newWorkflow.bind(this))

        return router
    }
}
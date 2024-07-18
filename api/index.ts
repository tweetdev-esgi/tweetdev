import * as express from 'express'
import * as mongoose from 'mongoose'
import * as morgan from "morgan"

import { Response, Request } from "express"
import listEndpoints = require('express-list-endpoints')
import { AuthController, UserController, ProgramController, WorkflowController } from './controller'
import { StartService } from './service'
import { PostController } from './controller/post.controller'
import { MessageController } from './controller/message.controller'
import { HubController } from './controller/hub.controller'
import { SaveCodeController } from './controller/saveCode.controller';

const cors = require('cors');
import * as dotenv from "dotenv";
dotenv.config({ path:'../.env' });

const startServer = async (): Promise<void> => {

    const connection = await mongoose.connect(process.env.MONGODB_URI as string, {auth: {
            username: process.env.MONGODB_USER as string,
            password: process.env.MONGODB_PASSWORD as string
        },
        authSource: "admin"
    })


    await StartService.userRoles()
    
    const app = express()
    const corsOptions = {
        origin: 'http://localhost:4000', 
    };
    app.use(cors(corsOptions));
  

    app.use(morgan("short"))
    app.get('/', (req, res) => {
        const response = { message: 'Server is up' };
        res.json(response);
      });
      
    
    const userController = new UserController()
    const authController = new AuthController() 
    const postController = new PostController()
    const messageController = new MessageController()
    const hubController = new HubController()
    const programController = new ProgramController()
    const workflowController = new WorkflowController()
    const saveCodeController = new SaveCodeController();

    await StartService.createUsers()

    app.use(userController.path, userController.buildRouter())
    app.use(authController.path, authController.buildRouter())
    app.use(postController.path, postController.buildRouter())
    app.use(messageController.path, messageController.buildRouter())
    app.use(hubController.path, hubController.buildRouter())
    app.use(programController.path, programController.buildRouter())
    app.use(workflowController.path, workflowController.buildRouter())
    app.use(saveCodeController.path, saveCodeController.buildRouter());


    app.listen(process.env.PORT, () => {
        console.log(`Server up on PORT : ${process.env.PORT}`)
    })

    console.table(listEndpoints(app))

}
startServer().catch((err) => {
    console.error(err)
})

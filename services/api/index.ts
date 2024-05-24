import * as express from 'express'
import * as mongoose from 'mongoose'
import * as morgan from "morgan"
require('dotenv').config();

import { Response, Request } from "express"
import listEndpoints = require('express-list-endpoints')
const cors = require('cors');

const startServer = async (): Promise<void> => {

    const app = express()
    const corsOptions = {
        origin: 'http://localhost:4200',
    };
    app.use(cors(corsOptions));
  

    app.use(morgan("short"))
    app.get('/', (req, res) => {
        const response = { message: 'Server is up' };
        res.json(response);
      });
      
    app.listen(process.env.PORT, () => {
        console.log(`Server up on PORT : ${process.env.PORT}`)
    })

    console.table(listEndpoints(app))

}
startServer().catch((err) => {
    console.error(err)
})

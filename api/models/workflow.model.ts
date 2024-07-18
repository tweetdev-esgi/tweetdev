import mongoose, { Schema, Model } from "mongoose";


const workflowSchema = new Schema<Workflow>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    content:{
        type: Schema.Types.Mixed,
        required: false
    },
    username :{
        type: Schema.Types.String,
        required: false
    },
    creationDate : {
        type: Schema.Types.Date,
        required: true
    },
    versions: [{
        name: {
            type: Schema.Types.String,
            required: true
        },
        content: {
            type: Schema.Types.Mixed,
            required: true
        },
        lastUpdated: {
            type: Schema.Types.Date,
            required: true
        },
        creationDate : {
            type: Schema.Types.Date,
            required: true
        },
    }]
    
}, {
    versionKey: false,
    collection: "Workflows"
})
export interface Workflow{
    _id: string
    name: string
    content: any
    username:string
    creationDate: Date
    versions: {
        name: string;
        content: any;
        lastUpdated: Date;
        creationDate: Date;
    }[];
}

export const WorkflowModel: Model<Workflow> = mongoose.model("Workflow", workflowSchema)
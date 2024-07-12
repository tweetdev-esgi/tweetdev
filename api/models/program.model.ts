import mongoose, { Schema, Model } from "mongoose";

const programSchema = new Schema<Program>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    content:[{
        type: Schema.Types.String,
        required: false
    }],
    inputFileType: {
        type: Schema.Types.String,
        required: true
    },
    outputFileType:{
        type: Schema.Types.String,
        required: true
    },
    authorName : [{
        type: Schema.Types.String,
        required: false
    }],
    creationDate : {
        type: Schema.Types.Date,
        required: true
    },


}, {
    versionKey: false,
    collection: "Programs"
})

export interface Program{
    _id: string
    name: string
    content: string
    inputFileType:string
    outputFileType:string
    authorName:string
    creationDate: Date
}

export const ProgramModel: Model<Program> = mongoose.model("Program", programSchema)
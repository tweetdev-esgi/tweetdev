import mongoose, { Schema, Model } from "mongoose";
import { Post } from "./post.model";
import { User } from "./user.model";

const hubSchema = new Schema<Hub>({
    name: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: false
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: false
    }],
    users:[{
        type: Schema.Types.String,
        required: false
    }],
    profileImageUrl: {
        type: Schema.Types.String,
        required: true
    },
    coverImageUrl:{
        type: Schema.Types.String,
        required: true
    },
    creationDate : {
        type: Schema.Types.Date,
        required: true
    }

}, {
    versionKey: false,
    collection: "Hubs"
})

export interface Hub{
    _id: string
    name: string
    posts: Post[]
    description: string
    creationDate: Date
    profileImageUrl: string
    coverImageUrl:string
    users: string[]
}

export const HubModel: Model<Hub> = mongoose.model("Hub", hubSchema)
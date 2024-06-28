import mongoose, { Schema, Model } from "mongoose";
import { User } from "./user.model";
import { Comment } from "./comment.model";

const likeSchema = new Schema({
    username: {
        type: Schema.Types.String,
        ref: "User",
        required: true
    },
    emojiIndex: {
        type: Schema.Types.Number,
        required: true
    }
}, { _id: false });

const postShemma = new Schema<Post>({
    content:{
        type: Schema.Types.String,
        required: true
    },
    like: [likeSchema], 
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false
    }],
    creationDate: {
        type: Schema.Types.Date,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true
    },
    hubname: {
        type: Schema.Types.String,
        required: false
    }
}, {
    versionKey: false,
    collection: "Posts"
})
export interface Like {
    username: string;
    emojiIndex: number;
}
export interface Post{
    _id: string
    content: string
    like: Like[]
    comments: Comment[]
    creationDate : Date
    username: string
    hubname: string | undefined
}


export const PostModel: Model<Post> = mongoose.model("Post", postShemma)
import mongoose, { Schema, Model } from "mongoose";
import { Role } from "./role.model";
import { Post } from "./post.model";

const userShemma = new Schema<User>({
    login: {
        type: Schema.Types.String,
        index: true,
        unique: true,
        required : true
    },
    password:{
        type: Schema.Types.String,
        required: true
    },
    firstname: {
        type: Schema.Types.String,
        required: true
    },
    lastname: {
        type: Schema.Types.String,
        required: true
    },
    roles:[{
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }],
    
    image: {
        type: Schema.Types.String,
        required: true
    },
    address: {
        type: Schema.Types.String,
        required: true
    },
    city: {
        type: Schema.Types.String,
        required: true
    },
    country: {
        type: Schema.Types.String,
        required: true
    },
    skills: [{
        type: Schema.Types.String,
        required: true
    }],
    hobbies: [{
        type: Schema.Types.String,
        required: true
    }],
    job: {
        type: Schema.Types.String,
        required: true
    },
    aboutMe: {
        type: Schema.Types.String,
        required: true
    },
    joinDate : {
        type: Schema.Types.Date,
        required: true
    },
    birthday : {
        type: Schema.Types.Date,
        required: true
    },
    follow: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]

}, {
    versionKey: false,
    collection: "Users"
})

export interface User{
    _id: string
    login: string
    password: string
    firstname: string
    lastname: string
    roles: Role[]
    posts: Post[]

    image: string
    address: string
    city: string
    country: string
    skills: string[]
    hobbies: string[]
    job: string
    aboutMe: string
    joinDate: Date
    birthday: Date

    follow: any[]

}

export const UserModel: Model<User> = mongoose.model("User", userShemma)
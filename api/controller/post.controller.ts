import { Document, Model } from "mongoose"
import { Post, PostModel } from "../models/post.model"
import * as express from "express"
import { Router, Response, Request } from "express"
import { checkBody, checkUserRole, checkUserToken } from "../middleware"
import { RolesEnums } from "../enums"
import { checkQuery } from "../middleware/query.middleware"
import { CommentModel, UserModel } from "../models"

export class PostController {

    readonly path: string
    readonly model: Model<Post>


    constructor(){
        this.path = "/post"
        this.model = PostModel
    }

    readonly paramsNewPost = {
        "title" : "string",
        "description" : "string"
    }

    newPost = async (req: Request, res: Response): Promise<void> => {

        const newPost = await PostModel.create({
            title: req.body.title,
            description: req.body.description,
            like: [],
            comments: [],
            creationDate: new Date(),
            userId : req.user?._id,
            authorName : req.user?.username,
            type: req.body.type,
            language: req.body.language,
            format: req.body.format
        })

        try{
            req.user?.posts.push(newPost)
            req.user?.save()
            
        }catch(err){
            res.status(500).end()
            return 
        }
        
        res.status(201).json(newPost)
        return 
    }

    readonly queryPostId = { 
        "id" : "string"
    }

    getOnePost = async (req:Request, res:Response): Promise<void> => {
        
        try{
            const post = await PostModel.findById(req.query.id).populate({
                path: "comments"
            })
            if (!post){
                res.status(404).end()
                return 
            }
            res.status(200).json(post)
        }catch(err){
            res.status(404).end()
            return
        }
    }

    readonly paramsComment = {
        "id_post" : "string",
        "description": "string"
    }

    addComment = async (req: Request, res: Response): Promise<void> => {

        let post : (Document<unknown, {}, Post> & Omit<Post & Required<{_id: string;}>, never>) | null  

        try{
            post = await PostModel.findById(req.body.id_post)
            if(!post){
                res.status(404).json({"message": "Post not found"})
            }
        }catch(err){
            res.status(404).end()
            return
        }

        const newComment = await CommentModel.create({
            description: req.body.description,
            author: req.user
        })

        post?.comments.push(newComment)
        post?.save()

        res.status(201).json(newComment)
        return

    }

    readonly paramsLike = {
        "post_id" : "string"
    }

    likePost = async (req: Request, res: Response): Promise<void> => {
        try {
            const post = await PostModel.findById(req.body.post_id);
            if (!post) {
                res.status(404).json({ "message": "Post not found" });
                return;
            }
            if (!req.user) {
                res.status(403).end();
                return;
            }
    
            const userLikedIndex = post.like.findIndex(l => String(l._id) === String(req.user?._id));
    
            if (userLikedIndex === -1) {
                post.like.push(req.user);
                await post.save();
                res.status(200).json({ "message": "Post liked" });
            } else {
                post.like.splice(userLikedIndex, 1);
                await post.save();
                res.status(200).json({ "message": "Post like removed" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ "message": "Internal Server Error" });
        }
    };
    

    nbrLike = async (req: Request, res: Response): Promise<void> => {
        
        try{
            const post = await PostModel.findById(req.query.id)
            if(!post){
                res.status(404).end()
                return
            }

            res.status(200).json({"likes" : post.like.length})
            
        }catch(err){
            res.status(404).end()
            return
        }
    }

    deletePost = async (req:Request, res:Response):Promise<void> => {
        try{
            const post = await PostModel.findById(req.query.id)
            if(!post){
                res.status(404).json({"message" :"Post not found"})
                return 
            }

            if (req.user && req.user.posts.some(p =>  String(p._id) !== String(post._id))){
                req.user.posts = req.user.posts.filter(p => {return String(p) !== String(post._id)})
                post.deleteOne()
                req.user.save()
                res.status(200).json({"message" : "Post deleted"})
                return 
            }
            res.status(401).json({"message" : "You're trying to delete a post that doesn't belong to you."})
            return 
 
        }catch(err){
            res.status(401).json({"message": "This is not a post Id"})
            return 
        }
    }
    


    getAllPosts = async (req:Request, res:Response): Promise<void> => {
        const all_post = await PostModel.find()
        res.status(200).json(all_post)
        return 
    }
    getSelfPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.query.userId || req.user?._id;
            if (!userId) {
                res.status(401).json({"message": "Unauthorized"});
                return;
            }

            const userPosts = await PostModel.find({ userId: userId });
            res.status(200).json(userPosts);
        } catch (err) {
            res.status(500).json({"message": "An error occurred while retrieving posts"});
        }
    }

    getUserPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.query.userId || req.user?._id;
            if (!userId) {
                res.status(401).json({"message": "Unauthorized"});
                return;
            }

            const userPosts = await PostModel.find({ userId: userId });
            res.status(200).json(userPosts);
        } catch (err) {
            res.status(500).json({"message": "An error occurred while retrieving posts"});
        }
    }
    isPostLikedByUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const post = await PostModel.findById(req.query.post_id);
            if (!post) {
                res.status(404).json({ "message": "Post not found" });
                return;
            }
            if (!req.user) {
                res.status(403).end();
                return;
            }

            const isLiked = post.like.some(user => String(user._id) === String(req.user?._id));
            res.status(200).json({ liked: isLiked });
        } catch (err) {
            res.status(500).json({ "message": "Internal Server Error" });
        }
    };
    getFollowedUsersPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(401).json({ "message": "Unauthorized" });
                return;
            }

            const user = await UserModel.findById(userId).populate("followers", "_id");

            if (!user) {
                res.status(404).json({ "message": "User not found" });
                return;
            }

            const followedUsersIds = user.followers.map((followedUser: any) => followedUser._id);

            const posts = await PostModel.find({ userId: { $in: followedUsersIds } });

            res.status(200).json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ "message": "Internal Server Error" });
        }
    };
    buildRouter = (): Router => {
        const router = express.Router()
        router.get('/', checkUserToken(), checkUserRole(RolesEnums.guest), checkQuery(this.queryPostId), this.getOnePost.bind(this))
        router.get('/all', checkUserToken(), this.getAllPosts.bind(this))
        router.get('/followed-users-posts', checkUserToken(), this.getFollowedUsersPosts.bind(this)); 
        router.get('/user-posts', checkUserToken(), this.getUserPosts.bind(this))
        router.get('/like', checkUserToken(),checkQuery(this.queryPostId), this.nbrLike.bind(this))
        router.get('/is-liked', checkUserToken(), this.isPostLikedByUser.bind(this)); 
        router.post('/', express.json(), checkUserToken(), checkUserRole(RolesEnums.guest), checkBody(this.paramsNewPost), this.newPost.bind(this))
        router.post('/comment', express.json(), checkUserToken(), checkBody(this.paramsComment), this.addComment.bind(this))
        router.patch('/like', express.json(), checkUserToken(), checkBody(this.paramsLike), this.likePost.bind(this))
        router.delete('/', checkUserToken(), checkQuery(this.queryPostId), this.deletePost.bind(this))
        return router
    }
}
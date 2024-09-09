import {ApiError} from '../lib/ApiError.js'
import {ApiResponse} from '../lib/ApiResponse.js'
import prisma from '../lib/prisma.js'

const getPosts = async (req, res) => {
    try{

        const posts = await prisma.post.findMany()

        return res
            .status(200)
            .json(
                new ApiResponse(200, posts, "all posts fetched successfully!")
            )
    }catch(err){
        console.log(err)

        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "Failed to get posts!");
    }
}
const getPost = async (req, res) => {
    const id = req.params.id;
    try{

        const post = await prisma.post.findUnique({
            where:{id},
            include:{
                postDetail: true,
                user: {
                    select:{
                        username: true,
                        avatar: true
                    }
                }
            }
        })

        return res
            .status(200)
            .json(
                new ApiResponse(200, post, "post fetched successfully!")
            )
    }catch(err){
        console.log(err)

        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "Failed to get posts!");
    }
}
const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try{

        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail
                }
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, newPost, "new post added successfully!")
            )
    }catch(err){
        console.log(err)

        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "Failed to get posts!");
    }
}
const updatePost = async (req, res) => {
    try{

        return res
            .status(200)
            .json(
                new ApiResponse(200)
            )
    }catch(err){
        console.log(err)

        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "Failed to get posts!");
    }
}
const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId

    try{

        const post = await prisma.post.findUnique({
            where:{id}
        });

        if(post.userId !== tokenUserId){
            throw new ApiError(403, "Not Authorized!")
        }

        await prisma.post.delete({ 
            where:{id},
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, null, "post deleted successfully!")
            )
    }catch(err){
        console.log(err)

        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "Failed to get posts!");
    }
}

export {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}
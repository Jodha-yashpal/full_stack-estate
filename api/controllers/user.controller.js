import {ApiError} from '../lib/ApiError.js'
import {ApiResponse} from '../lib/ApiResponse.js'
import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        return res
        .status(200)
        .json(
            new ApiResponse(200, users, "users fetched successfully!")
        )
        
    } catch (err) {
        console.log(err)

        throw new ApiError(500, "Failed to get users!");
    }
}

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where:{id: id}
        })

        return res
            .status(200)
            .json(
                new ApiResponse(200, user, "user fetched successfully!")
            )
        
    } catch (err) {
        console.log(err)
        
        throw new ApiError(500, "Failed to get user!");
    }
}

const updateUser = async (req, res) => {
    
    try {
        const id = req.params.id
        const tokenUserId = req.userId

        if (id !== tokenUserId) {
            throw new ApiError(500, "Not Authorized!")
        }

        const {password, ...inputs} = req.body;

        let updatedPassword = null;

        if(password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }


        const updatedUser = await prisma.user.update({
            where:{id : id},
            data: {
                ...inputs,
                ...(updatedPassword && {password: updatedPassword}),
            }
        })

        const {password: userPassword, ...rest} = updatedUser;

        return res
            .status(200)
            .json(
                new ApiResponse(200, updatedUser, "user updated successfully!")
            )
        

    } catch (err) {
        console.log(err)

        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "Failed to update user!");
    }
}

const deleteUser = async (req, res) => {
    try {

        const id = req.params.id
        const tokenUserId = req.userId

        if (id !== tokenUserId) {
            throw ApiError(500, "Not Authorized!")
        }

        await prisma.user.delete({
            where: { id: id}
        })

        return res
            .status(200)
            .json(
                new ApiResponse(200, null, "user deleted successfully!")
            )
        
    } catch (err) {
        console.log(err)

        throw new ApiError(500, "Failed to delete user!");
    }
}

const savePost = async (req, res) => {

    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const savedPost = await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    userId: tokenUserId,
                    postId: postId
                }
            }
        })
        if(savedPost) {
            await prisma.savedPost.delete({
                where:{
                    id: savedPost.id
                }
            })
            return res
            .status(200)
            .json(
                new ApiResponse(200, null, "post removed from saved list successfully!")
            )
        }

        await prisma.savedPost.create({
            data:{
                userId: tokenUserId,
                postId: postId
            }
        })

        return res
            .status(200)
            .json(
                new ApiResponse(200, null, "post saved successfully!")
            )
        

    } catch (err) {
        console.log(err)

        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "Failed to save post!");
    }
}

const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const userPosts = await prisma.post.findMany({
            where:{userId: tokenUserId}
        });
        const saved = await prisma.savedPost.findMany({
            where:{userId: tokenUserId},
            include:{
                post:true
            }
        });
        const savedPosts = saved.map((item) => item.post)

        return res
            .status(200)
            .json(
                new ApiResponse(200, {userPosts, savedPosts}, "profile posts fetched successfully!")
            )
        
    } catch (err) {
        console.log(err)
        
        throw new ApiError(500, "Failed to get profile posts!");
    }
}

export {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    savePost,
    profilePosts
}
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

export {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}
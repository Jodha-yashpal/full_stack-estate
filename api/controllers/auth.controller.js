import {ApiError} from '../lib/ApiError.js'
import {ApiResponse} from '../lib/ApiResponse.js'
import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'

const registerUser = async (req, res) => {
    try {
        //fetch
        const {username, email, password} = req.body;

        //validation
        if(!username || !email || !password){
            throw new ApiError(402, "all fields are required")
        }

        //check if user exists
        const existingUser = await prisma.user.findUnique({
            where:{
                username: username
            }
        })

        if (existingUser) {
            throw new ApiError(410, "user already exists"); 
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        });

        //return result
        return res.status(201).json(
            new ApiResponse(201, newUser, "success")
        ) 

        
    } catch (error) {
        console.log(error);

        if (error instanceof ApiError) {
            return res
            .status(error.statusCode)
            .json(
                new ApiResponse(error.statusCode, null, error.message)
            )
        }

        throw new ApiError(500, "Failed to create user?");
    }
}

export {registerUser}
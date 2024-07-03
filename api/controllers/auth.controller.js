import { ApiError } from '../lib/ApiError.js'
import { ApiResponse } from '../lib/ApiResponse.js'
import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const registerUser = async (req, res) => {
    try {
        //fetch
        const { username, email, password } = req.body;

        //validation
        if (!username || !email || !password) {
            throw new ApiError(402, "all fields are required")
        }

        //check if user exists
        const existingUser = await prisma.user.findUnique({
            where: {
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
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        //return result
        return res.status(201).json(
            new ApiResponse(201, newUser, "User registered successfully!")
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

const login = async (req, res) => {
    try {
        //fetch 
        const { username, password } = req.body;

        //validation
        if (!username || !password) {
            throw new ApiError(402, "both fields are required")
        }

        //check if user exists
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            throw new ApiError(401, "Invalid Credentials!")
        }

        //check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid Credentials!")
        }

        //generate cookie token and send to the user

        const token = jwt.sign({
            id: user.id
        },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )

        const age = 1000*60*60*24*7

        const {password: userPassword, ...userInfo} = user

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true
            maxAge: age
        })
            .status(200)
            .json(
                new ApiResponse(200, userInfo, "login Successfull")
            )

    } catch (error) {
        console.log("error", error)

        if (error instanceof ApiError) {
            return res
                .status(error.statusCode)
                .json(
                    new ApiResponse(error.statusCode, null, error.message)
                )
        }
        throw new ApiError(500, "Failed to login the user")
    }
}

const logout = (req, res) => {
    res.clearCookie("token")
        .status(200)
        .json(
            new ApiResponse(200, null, "logout Successfull")
        )
}

export { registerUser, login, logout }
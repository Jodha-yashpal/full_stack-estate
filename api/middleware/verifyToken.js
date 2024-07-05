import jwt from 'jsonwebtoken'
import { ApiError } from '../lib/ApiError.js'
import { ApiResponse } from '../lib/ApiResponse.js'


const verifyToken = (req, res, next) => {
    try {
        //fetch token from cookie
        const token = req.cookies.token

        if (!token) {
            throw new ApiError(401, "Not Authenticated!")
        }

        //check if token is valid
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, payload) => {
            if (err) {
                throw new ApiError(403, "Token is not valid!")
            }
            req.userId = payload.id

            next(); 
        })
    } catch (err) {
        console.log("error", err)
        if (err instanceof ApiError) {
            return res
                .status(err.statusCode)
                .json(
                    new ApiResponse(err.statusCode, null, err.message)
                )
        }

        throw new ApiError(500, "failed to test route")
    }

    
}

export {verifyToken}
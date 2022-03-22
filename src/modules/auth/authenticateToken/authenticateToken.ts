import express from 'express'
import jwt from 'jsonwebtoken'

export const authenticateToken = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    const token = req.headers['authorization']

    if (!token)
    return res.status(401).json({
        message : "A token is required for authentication"
    });

    try {
        const decoded = jwt.verify(token, 'JWT_SECRET');
        req.user = decoded;

        } catch (err) {
            console.log(err)
            return res.status(401).send("Invalid Token");
    }
    return next();
}

export const testAuth = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        const user = req.user;
        return res.status(200).json({
            message : "Authenticate ok"
            })
    }catch (error) {
        return console.log(error)
    }
}
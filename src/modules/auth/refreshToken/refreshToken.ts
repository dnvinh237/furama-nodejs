import express from 'express'
import { UserModel } from '../../../models';
import * as userService from '../../user/user.service'
import { handleAuthLogic } from '../utils';


export const refreshToken = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    const { refreshToken} = req.cookies;
    
    if(!refreshToken){
        return res.status(401).json({message: "no refresh token"})
    }
    const user = (await userService.findUserByPredicate({refreshToken: refreshToken}))as UserModel
    
    if(!user){
        return res.status(401).json({message: "Unauthorized"})
    }
    const token = await handleAuthLogic({
        username : user.username,
        res
    })
    return res.status(200).json({
        token
        ,data: {username: user.username}})
}
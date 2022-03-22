import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../../models';
import * as userService from '../../user/user.service'
import bcrypt from 'bcrypt'
import { handleAuthLogic } from '../utils';

export const login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        const { username, password } = req.body;

        const user = (await userService.findUserByPredicate({ username: username })) as UserModel;
        
        if (user == null || !( await bcrypt.compare(password, user.password ))) {
            return res.status(400).json({ message:'username or password wrong' })
        }

        const token = await handleAuthLogic({
            username : user.username,res
        })

        return res.status(200).json({
            token,
            data: {username: user.username}})
    }catch (error) {
        return next(error)
    }
}
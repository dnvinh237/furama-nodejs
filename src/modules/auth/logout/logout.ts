import express from 'express'
import { UserModel } from '../../../models';
import * as userService from '../../user/user.service'


export const logout = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    const { username } = req.body;

    await userService.updateRefreshToken({ username : username, refreshToken: ''})

    res.clearCookie('refreshToken')

    return res.status(200).json({message: 'Logout done'})
}
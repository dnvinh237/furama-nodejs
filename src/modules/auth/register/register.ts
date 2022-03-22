import express from 'express'
import * as userService from '../../user/user.service'

export const register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    const { username, password } = req.body;
    const user = await userService.createUser(username,password)
    return res.status(200).json(user);

}
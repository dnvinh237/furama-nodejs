import jwt from 'jsonwebtoken'
import * as userService from '../user/user.service'

export const handleAuthLogic = async ({username,res }):Promise<unknown>=> {

    const token = jwt.sign({ username: username}, process.env.JWT_SECRET,{expiresIn: 60 *5}) // 5 mins

    const newRefreshToken = jwt.sign({ username: username, isRefreshToken: true}, process.env.JWT_SECRET)

    await userService.updateRefreshToken({ username: username, refreshToken: newRefreshToken})

    res.cookie('refreshToken',newRefreshToken, {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true
    })

    return token;
}

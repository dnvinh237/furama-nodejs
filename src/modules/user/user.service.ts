import _ from "lodash"
import { UserModel } from "../../models"
import bcrypt from 'bcrypt'

export const findUserByPredicate = (predicate: Record<string, number>) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOne({
                where: predicate
            })
            return resolve(user)
        } catch (e) {
            reject(e);
        }
    })
}

export const updateRefreshToken = ( {username,refreshToken}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = (await findUserByPredicate({username: username})) as UserModel
            if(user){
               return resolve( await user.update({refreshToken: refreshToken}))
            } 
        } catch (e) {
            reject(e);
        }
    })
}

export const createUser = (username: string,password: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await hashPassword(password)
            const user = { username: username, password: hashedPassword}
            let results = await UserModel.create(user);
            return resolve(results)
        } catch (e) {
            reject(e);
        }
    })
}

const saltRounds = 10;
const hashPassword = async (password: string): Promise<unknown> =>
    new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
})



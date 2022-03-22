import express from 'express'
import { register } from './register/register'
import { login  } from './login/login'
import { refreshToken } from './refreshToken/refreshToken'
import { logout } from './logout/logout'
import { authenticateToken,testAuth} from './authenticateToken/authenticateToken'

const authRouter: express.Router = express.Router()

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/register', register)
authRouter.get('/refreshToken', refreshToken)
authRouter.get('/testAuth', authenticateToken, testAuth)

export default authRouter;
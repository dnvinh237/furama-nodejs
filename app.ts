import express from 'express';
import createError, { NotFound, HttpError } from 'http-errors'
import router from './routes'
import './sequelize'
import cors, { CorsOptions } from 'cors'

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const allowList = [
    'http://localhost:4200'
]
const corsOptionsDelegate = function (
    req: express.Request,
    callback: (err: Error | null, options?: CorsOptions) => void
) {
    let corsOptions
    if (allowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true, optionsSuccessStatus: 200, credentials: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))

app.use(router);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    return next(createError(404))
})
// error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof NotFound) {
        return res.status(404).json({ message: 'Not Found' })
    }
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json(err)
    }
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    console.error(err)
    return res.status(500).json(createError(500, 'Internal Server Error'))
    // return res.status(500).json(new HttpError('Internal Server Error'))
})

app.listen(port, () => {
    console.log("App is listening on port ", port)
})
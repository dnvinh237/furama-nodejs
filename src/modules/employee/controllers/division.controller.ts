import express from 'express'
import * as divisionService from '../services'
import { Response } from '../../../common'

export const findAllDivision = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        return res
            .status(200)
            .json(
                new Response(
                    200,
                    'OK',
                    (await divisionService.findAllDivision()
                    )
                ))
    } catch (error) {
        return next(error)
    }
}

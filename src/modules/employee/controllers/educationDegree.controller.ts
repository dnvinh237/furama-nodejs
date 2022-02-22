import express from 'express'
import * as educationDegree from '../services'
import { Response } from '../../../common'

export const findAllEducationDegree = async (
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
                    (await educationDegree.findAllEducationDegree()
                    )
                ))
    } catch (error) {
        return next(error)
    }
}

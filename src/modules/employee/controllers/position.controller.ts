import express from 'express'
import * as positionService from '../services'
import { Response } from '../../../common'

export const findAllPosition = async (
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
                    (await positionService.findAllPosition()
                    )
                ))
    } catch (error) {
        return next(error)
    }
}

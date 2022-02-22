import express from 'express'
import * as rentTypeService from '../services'
import { Response } from '../../../common'

export const findAllRentType = async (
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
                    (await rentTypeService.findAllRentType()
                    )
                ))
    } catch (error) {
        return next(error)
    }
}
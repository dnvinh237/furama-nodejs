import express from 'express'
import * as AccompaniedServiceServices from '../services'
import { Response } from '../../../common'

export const findAllAccompaniedService = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let results = await AccompaniedServiceServices.findAllAccompaniedService();
        return res
            .status(200)
            .json(
                new Response(
                    200,
                    'OK',
                    results
                ))
    } catch (error) {

        return next(error)
    }
}

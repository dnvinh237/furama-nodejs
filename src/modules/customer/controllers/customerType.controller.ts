import express from 'express'
import * as customerTypeSerivce from '../services'
import { Response } from '../../../common'

export const findAllCustomerType = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let results = await customerTypeSerivce.findAllCustomerType();
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

import express from 'express'
import * as contractService from '../services'
import { Response } from '../../../common'
import { CreateContractRequestParams, UpdateContractRequestParams } from '../types';
import { validationResult } from 'express-validator/src/validation-result';
import createHttpError from 'http-errors';


export const findAllContract = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { page } = req.query;
        let limit = 3;
        let results = await contractService.findAllContract({ limit, page })
        return res
            .status(200)
            .json(
                new Response(
                    200,
                    'OK',
                    {
                        currentPage: page || 1,
                        totalRecord: results.count,
                        data: results.rows
                    }
                ))
    } catch (error) {
        return next(error)
    }
}

export const findByIdContract = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id;
        let results = await contractService.findByIdContract(id);
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

export const createContract = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(createHttpError(400, 'Invalid request params', { errors: errors.array() }))
        }
        let {
            startDate,
            endDate,
            deposit,
            totalMoney,
            employeeId,
            customerId,
            serviceId,
        } = req.body as CreateContractRequestParams

        let results = await contractService.createContract({
            startDate,
            endDate,
            deposit,
            totalMoney,
            employeeId,
            customerId,
            serviceId,
        })
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

export const updateContract = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { id,
            startDate,
            endDate,
            deposit,
            totalMoney,
            employeeId,
            customerId,
            serviceId, } = req.body as UpdateContractRequestParams
        let results = await contractService.updateContract({
            id,
            startDate,
            endDate,
            deposit,
            totalMoney,
            employeeId,
            customerId,
            serviceId,
        })
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

export const deleteContract = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id: number = req.params.id;
        let results = await contractService.deleteContract({ id: id })
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
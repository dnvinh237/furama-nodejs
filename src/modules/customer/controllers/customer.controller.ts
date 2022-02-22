import express from 'express'
import * as customerService from '../services'
import { Response } from '../../../common'
import { CreateCustomerRequestParams, UpdateCustomerRequestParams } from '../types';

export const findAllCustomer = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { page, search } = req.query;
        let limit = 3;
        let searchValue: string = search;
        let results = await customerService.findAllCustomer({ limit, page, searchValue })
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

export const findByIdCustomer = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id;
        let results = await customerService.findByIdCustomer(id);
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

export const createCustomer = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let {
            code,
            name,
            dayOfBirth,
            idCard,
            phone,
            email,
            address,
            customerTypeId
        } = req.body as CreateCustomerRequestParams

        let results = await customerService.createCustomer({
            code,
            name,
            dayOfBirth,
            idCard,
            phone,
            email,
            address,
            customerTypeId
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

export const updateCustomer = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { id,
            code,
            name,
            dayOfBirth,
            idCard,
            phone,
            email,
            address,
            customerTypeId } = req.body as UpdateCustomerRequestParams
        let results = await customerService.updateCustomer({
            id,
            code,
            name,
            dayOfBirth,
            idCard,
            phone,
            email,
            address,
            customerTypeId
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

export const deleteCustomer = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id
        let results = await customerService.deleteCustomer(id)
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
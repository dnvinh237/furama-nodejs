import { CreateServiceRequestParams, UpdateServiceRequestParams } from './../types';
import express from 'express'
import * as serviceServices from '../services'
import { Response } from '../../../common'



export const findAllService = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { page, search } = req.query;
        let limit = 3;
        let searchValue: string = search;
        let results = await serviceServices.findAllService({ limit, page, searchValue })
        return res
            .status(200)
            .json(
                new Response(
                    200,
                    'OK', {
                    currentPage: page || 1,
                    totalRecord: results.count,
                    data: results.rows
                }
                ))
    } catch (error) {
        return next(error)
    }
}


export const findByIdService = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id;
        let results = await serviceServices.findByIdService(id);
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

export const createService = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { code,
            name,
            area,
            numberOfFloor,
            cost,
            maxPeople,
            status
        } = req.body as CreateServiceRequestParams
        let results = await serviceServices.createService({
            code,
            name,
            area,
            numberOfFloor,
            cost,
            maxPeople,
            status
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

export const updateService = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { id, code,
            name,
            area,
            numberOfFloor,
            cost,
            maxPeople,
            status } = req.body as UpdateServiceRequestParams
        let results = await serviceServices.updateServices({
            id, code,
            name,
            area,
            numberOfFloor,
            cost,
            maxPeople,
            status
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

export const deleteService = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id
        let results = await serviceServices.deleteService(id)
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
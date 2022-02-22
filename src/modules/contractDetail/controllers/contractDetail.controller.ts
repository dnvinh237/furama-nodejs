import express from 'express'
import { Response } from '../../../common'
import * as contractDetailService from '../services'
import { CreateContractDetailRequestParams, UpdateContractDetailRequestParams } from '../index';

export const findAllContractDetail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { page } = req.query;
        let limit = 3;
        let results = await contractDetailService.findAllContractDetail({ limit, page })
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

export const findByIdContractDetail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id;
        let results = await contractDetailService.findByIdContractDetail(id);
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

export const createContractDetail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let {
            quantity,
            ContractId,
            accompaniedServiceId
        } = req.body as CreateContractDetailRequestParams

        let results = await contractDetailService.createContractDetail({
            quantity,
            ContractId,
            accompaniedServiceId
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

export const updateContractDetail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { id,
            quantity,
            ContractId,
            accompaniedServiceId } = req.body as UpdateContractDetailRequestParams
        let results = await contractDetailService.updateContractDetail({
            id,
            quantity,
            ContractId,
            accompaniedServiceId
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

export const deleteContractDetail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id
        let results = await contractDetailService.deleteContractDetail(id)
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
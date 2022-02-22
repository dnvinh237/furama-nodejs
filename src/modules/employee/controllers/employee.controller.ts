import express from 'express'
import * as employeeService from '../services'
import { Response } from '../../../common'
import { CreateEmployeeRequestParams, updateEmployeeRequestParams } from '../types'
import createHttpError from 'http-errors'
import { body, validationResult } from 'express-validator'

export const findAllEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let { page, search } = req.query;
        let limit = 3;
        let searchValue: string = search;
        let results = await employeeService.findAllEmployee({ limit, page, searchValue })
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


export const findByIdEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id = req.params.id;
        let results = await employeeService.findByIdEmployee(id);
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

export const createEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(createHttpError(400, 'Invalid request params', { errors: errors.array() }))
        }
        let { name,
            positionId,
            divisionId,
            educationDegreeId } = req.body as CreateEmployeeRequestParams

        let results = await employeeService.createEmployee({
            name,
            positionId,
            divisionId,
            educationDegreeId
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

export const updateEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(createHttpError(400, 'Invalid request params', { errors: errors.array() }))
        }
        let { id, name,
            positionId,
            divisionId,
            educationDegreeId } = req.body as updateEmployeeRequestParams

        let results = await employeeService.updateEmployee({
            id, name,
            positionId,
            divisionId,
            educationDegreeId
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

export const deleteEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<unknown> => {
    try {
        let id: number = req.params.id;
        let results = await employeeService.deleteEmployee(id)
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
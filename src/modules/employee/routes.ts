import express from 'express'
import { findAllDivision } from './controllers/division.controller'
import { findAllEducationDegree } from './controllers/educationDegree.controller'
import { createEmployee, findAllEmployee, findByIdEmployee, deleteEmployee, updateEmployee } from './controllers/employee.controller'
import { findAllPosition } from './controllers/position.controller'
import { checkSchema } from 'express-validator'
import employeeSchema from './validator-schema/employee.validator-schema'
const employeeRoute: express.Router = express.Router()

employeeRoute.get('/position', findAllPosition)
employeeRoute.get('/division', findAllDivision)
employeeRoute.get('/educationDegree', findAllEducationDegree)

employeeRoute.get('/', findAllEmployee)
employeeRoute.post('/', checkSchema(employeeSchema), createEmployee)
employeeRoute.put('/', checkSchema(employeeSchema), updateEmployee)
employeeRoute.get('/:id', findByIdEmployee)
employeeRoute.delete('/:id', deleteEmployee)

export default employeeRoute

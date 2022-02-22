import express from 'express'
import { createCustomer, deleteCustomer, findAllCustomer, findByIdCustomer, updateCustomer } from './controllers/customer.controller'
import { findAllCustomerType } from './controllers/customerType.controller'

const customerRoute: express.Router = express.Router()

customerRoute.get('/customerType', findAllCustomerType)


customerRoute.get('/', findAllCustomer)
customerRoute.get('/:id', findByIdCustomer)
customerRoute.post('/', createCustomer)
customerRoute.put('/', updateCustomer)
customerRoute.delete('/:id', deleteCustomer)
export default customerRoute

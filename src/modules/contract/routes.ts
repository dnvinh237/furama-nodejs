import express from 'express'
import { createContract, deleteContract, findAllContract, findByIdContract, updateContract } from './controllers/contract.controller'
import { checkSchema } from 'express-validator'
import contractSchema from './validator-schema/contract.validator-schema'

const contractRoute: express.Router = express.Router()

contractRoute.get('/', findAllContract)
contractRoute.get('/:id', findByIdContract)
contractRoute.post('/', checkSchema(contractSchema), createContract)
contractRoute.put('/', updateContract)
contractRoute.delete('/:id', deleteContract)


export default contractRoute

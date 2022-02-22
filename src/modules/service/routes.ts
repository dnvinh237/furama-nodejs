import express from 'express'
import { findAllRentType } from './controllers/rentType.controller'
import { updateService, findAllService, createService, findByIdService, deleteService } from './controllers/service.controller'



const serviceRoute: express.Router = express.Router()

serviceRoute.get('/rentType', findAllRentType)
serviceRoute.get('/', findAllService)
serviceRoute.post('/', createService)
serviceRoute.put('/', updateService)
serviceRoute.get('/:id', findByIdService)
serviceRoute.delete('/:id', deleteService)

export default serviceRoute
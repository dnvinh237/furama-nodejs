import express from 'express'
import { deleteContractDetail } from '.'
import { findAllAccompaniedService } from './controllers/accompaniedService.controller'
import { createContractDetail, findAllContractDetail, findByIdContractDetail, updateContractDetail } from './controllers/contractDetail.controller'


const contractDetailRoute: express.Router = express.Router()

contractDetailRoute.get('/accompaniedService', findAllAccompaniedService)

contractDetailRoute.get('/', findAllContractDetail)
contractDetailRoute.get('/:id', findByIdContractDetail)
contractDetailRoute.post('/', createContractDetail)
contractDetailRoute.put('/', updateContractDetail)
contractDetailRoute.delete('/:id', deleteContractDetail)


export default contractDetailRoute

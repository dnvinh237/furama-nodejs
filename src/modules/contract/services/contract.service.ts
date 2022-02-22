
import _ from 'lodash';
import { ContractModel } from '../../../models';
import { CreateContractRequestParams, UpdateContractRequestParams } from '../types';
import * as contractDetailService from '../../contractDetail'
import ContractDetail from '../../../models/contractDetail.model';

export const findAllContract = ({
    limit,
    page
}): Promise<{ rows: ContractModel[], count: number }> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ContractModel.findAndCountAll({
                limit: limit,
                order: [['id', 'ASC']],
                offset: !page || page === 1 ? 0 : (page - 1) * limit,
                distinct: true
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}



export const findByIdContract = (id: number): Promise<ContractModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ContractModel.findByPk(id);
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const createContract = ({
    startDate,
    endDate,
    deposit,
    totalMoney,
    employeeId,
    customerId,
    serviceId,
}: CreateContractRequestParams): Promise<ContractModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ContractModel.create({
                startDate,
                endDate,
                deposit,
                totalMoney,
                employeeId,
                customerId,
                serviceId,
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const updateContract = ({
    id,
    startDate,
    endDate,
    deposit,
    totalMoney,
    employeeId,
    customerId,
    serviceId,
}: UpdateContractRequestParams): Promise<ContractModel> => {

    return new Promise(async (resolve, reject) => {
        try {
            let [contractModel] = await ContractModel.upsert({
                id,
                startDate,
                endDate,
                deposit,
                totalMoney,
                employeeId,
                customerId,
                serviceId,
            }, {
                returning: true
            });
            await contractModel.reload({
                include: [ContractDetail]
            })
            return resolve(contractModel);
        } catch (e) {
            reject(e);
        }
    })
}
export const deleteContract = (predicate: Record<string, number>): Promise<number> => {
    return new Promise(async (resolve, reject) => {
        try {
            let id: number = predicate.id
            let contractDetails = await contractDetailService.findContractDetailBy({ contract_id: id })
            if (contractDetails && contractDetails.length > 0)
                await contractDetailService.deleteContractDetail({ contract_id: id })
            let data = await ContractModel.destroy({
                where: predicate
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const findContractBy = (predicate: Record<string, unknown>): Promise<ContractModel[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let contractModels = ContractModel.findAll({
                where: predicate
            })
            return resolve(contractModels)
        } catch (e) {
            reject(e);
        }
    })
}


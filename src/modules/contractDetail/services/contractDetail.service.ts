import _ from 'lodash';
import { CreateContractDetailRequestParams, UpdateContractDetailRequestParams } from '..';
import { AccompaniedServiceModel, ContractDetailModel } from '../../../models';


export const findAllContractDetail = ({
    limit,
    page
}): Promise<{ rows: ContractDetailModel[], count: number }> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ContractDetailModel.findAndCountAll({
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



export const findByIdContractDetail = (id: number): Promise<ContractDetailModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ContractDetailModel.findByPk(id);
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const createContractDetail = ({
    quantity,
    ContractId,
    accompaniedServiceId
}: CreateContractDetailRequestParams): Promise<ContractDetailModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ContractDetailModel.create({
                quantity,
                ContractId,
                accompaniedServiceId
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const updateContractDetail = ({
    id,
    quantity,
    ContractId,
    accompaniedServiceId
}: UpdateContractDetailRequestParams): Promise<ContractDetailModel> => {

    return new Promise(async (resolve, reject) => {
        try {
            let [contractDetailModel] = await ContractDetailModel.upsert({
                id,
                quantity,
                ContractId,
                accompaniedServiceId
            }, {
                returning: true
            });
            await contractDetailModel.reload({
                include: [AccompaniedServiceModel]
            })
            return resolve(contractDetailModel);
        } catch (e) {
            reject(e);
        }
    })
}
export const deleteContractDetail = (predicate: Record<string, unknown>): Promise<number> => {

    return new Promise(async (resolve, reject) => {
        try {
            let data = await ContractDetailModel.destroy({
                where: predicate
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const findContractDetailBy = (predicate: Record<string, number>): Promise<ContractDetailModel[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let contractDetails = ContractDetailModel.findAll({
                where: predicate
            })
            return resolve(contractDetails);
        } catch (e) {
            reject(e);
        }
    })
}



import { CreateServiceRequestParams, UpdateServiceRequestParams } from '../types';
import * as _ from 'lodash'
import { ServiceModel } from '../../../models'

export const findAllService = ({
    limit,
    page,
    searchValue,
}): Promise<{ rows: ServiceModel[], count: number }> => {
    return new Promise(async (resolve, reject) => {
        try {
            let predicate = {}
            if (searchValue) {
                predicate = {
                    id: await findServiceByName(searchValue)
                }
            }
            let results = await ServiceModel.findAndCountAll({
                limit: limit,
                order: [['id', 'ASC']],
                offset: !page || page === 1 ? 0 : (page - 1) * limit,
                where: predicate,
                distinct: true
            });
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}

export const findServiceBy = (predicate: Record<string, unknown>): Promise<ServiceModel[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const serviceModels = await ServiceModel.findAll({
                where: predicate
            })
            return resolve(serviceModels)
        } catch (e) {
            reject(e);
        }
    })

}

export const findServiceByName = (searchValue: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const lowerCaseSearchValue = searchValue.toLowerCase()
            let [ids] = await ServiceModel.sequelize.query(
                `select distinct service.id from "service" where lower(service.name) like '%${lowerCaseSearchValue}'`
            )
            return resolve(_.uniq(_.map(ids, (elem: Record<string, unknown>) => elem.id)))
        } catch (e) {
            reject(e);
        }
    })
}

export const findByIdService = (id: number): Promise<ServiceModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = ServiceModel.findByPk(id);
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}

export const createService = ({
    code,
    name,
    area,
    numberOfFloor,
    cost,
    maxPeople,
    status,
}: CreateServiceRequestParams): Promise<ServiceModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = ServiceModel.create({
                code,
                name,
                area,
                numberOfFloor,
                cost,
                maxPeople,
                status
            });
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}

export const updateServices = ({
    id,
    code,
    name,
    area,
    numberOfFloor,
    cost,
    maxPeople,
    status
}: UpdateServiceRequestParams): Promise<[number, ServiceModel[]]> => {

    return new Promise(async (resolve, reject) => {
        try {
            let results = ServiceModel.update({
                code,
                name,
                area,
                numberOfFloor,
                cost,
                maxPeople,
                status
            }, {
                where: { id: id }
            });
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}

export const deleteService = (predicate: Record<string, unknown>): Promise<number> => {

    return new Promise(async (resolve, reject) => {
        try {
            let results = ServiceModel.destroy({
                where: predicate
            });
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}

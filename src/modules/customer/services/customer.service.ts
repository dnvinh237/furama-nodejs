import { UpdateCustomerRequestParams } from '../types';
import _ from 'lodash';
import { CustomerModel, CustomerTypeModel } from '../../../models'
import { CreateCustomerRequestParams } from '../types';
import * as contractService from '../../contract'

export const findAllCustomer = ({
    limit,
    page,
    searchValue,
}): Promise<{ rows: CustomerModel[], count: number }> => {
    return new Promise(async (resolve, reject) => {
        try {
            let predicate = {}
            if (searchValue) {
                predicate = {
                    id: await findCustomerByName(searchValue)
                }
            }
            let data = await CustomerModel.findAndCountAll({
                limit: limit,
                order: [['id', 'ASC']],
                offset: !page || page === 1 ? 0 : (page - 1) * limit,
                where: predicate,
                distinct: true
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}


export const findCustomerByName = (searchValue: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const lowerCaseSearchValue = searchValue.toLowerCase()
            let [ids] = await CustomerModel.sequelize.query(
                `select distinct customer.id from "customer" where lower(customer.name) like '%${lowerCaseSearchValue}'`
            )
            return resolve(_.uniq(_.map(ids, (elem: Record<string, unknown>) => elem.id)))
        } catch (e) {
            reject(e);
        }
    })
}


export const findByIdCustomer = (id: number): Promise<CustomerModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = CustomerModel.findByPk(id);
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const createCustomer = ({
    code,
    name,
    dayOfBirth,
    idCard,
    phone,
    email,
    address,
    customerTypeId,
}: CreateCustomerRequestParams): Promise<CustomerModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = CustomerModel.create({
                code,
                name,
                dayOfBirth,
                idCard,
                phone,
                email,
                address,
                customerTypeId,
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

export const updateCustomer = ({
    id,
    code,
    name,
    dayOfBirth,
    idCard,
    phone,
    email,
    address,
    customerTypeId,
}: UpdateCustomerRequestParams): Promise<CustomerModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let [customerModel] = await CustomerModel.upsert({
                id,
                code,
                name,
                dayOfBirth,
                idCard,
                phone,
                email,
                address,
                customerTypeId,
            }, {
                returning: true
            });
            await customerModel.reload({
                include: [CustomerTypeModel]
            })
            return resolve(customerModel);
        } catch (e) {
            reject(e);
        }
    })
}

export const deleteCustomer = (id: number): Promise<number> => {

    return new Promise(async (resolve, reject) => {
        try {
            await contractService.deleteContract({ customer_id: id })
            let data = await CustomerModel.destroy({
                where: { id: id }
            });
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}



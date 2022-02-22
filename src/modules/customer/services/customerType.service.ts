import { CustomerTypeModel } from '../../../models'


export const findById = async (id: number): Promise<CustomerTypeModel | null> =>
    CustomerTypeModel.findByPk(id)

export const findAllCustomerType = async (): Promise<CustomerTypeModel[]> =>
    CustomerTypeModel.findAll()
import * as _ from 'lodash'
import { updateEmployeeRequestParams } from './../types';
import { AccompaniedServiceModel, CustomerTypeModel, DivisionModel, EducationDegreeModel, EmployeeModel, PositionModel, RentTypeModel } from '../../../models'
import { CreateEmployeeRequestParams } from '../types'
import Position from '../../../models/position.model';
import * as contractService from '../../contract/services'

export const findAllEmployee = ({
    limit,
    page,
    searchValue,
}): Promise<{ rows: EmployeeModel[], count: number }> => {
    return new Promise(async (resolve, reject) => {
        try {
            let predicate = {}
            if (searchValue) {
                predicate = {
                    id: await findEmployeeByName(searchValue)
                }
            }
            let results = await EmployeeModel.findAndCountAll({
                limit: limit,
                order: [['id', 'ASC']],
                offset: !page || page === 1 ? 0 : (page - 1) * limit,
                where: predicate,
                distinct: true,
                include: { model: Position }
            });
            return resolve(results);
            // return null;
        } catch (e) {
            reject(e);
        }
    })
}

export const findEmployeeByName = (searchValue: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const lowerCaseSearchValue = searchValue.toLowerCase()
            let [ids] = await EmployeeModel.sequelize.query(
                `select distinct employee.id from "employee" where lower(employee.name) like '%${lowerCaseSearchValue}'`
            )
            return resolve(_.uniq(_.map(ids, (elem: Record<string, unknown>) => elem.id)))
        } catch (e) {
            reject(e);
        }
    })
}

export const findByIdEmployee = (id: number): Promise<EmployeeModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = EmployeeModel.findByPk(id);
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}

export const createEmployee = ({ name,
    positionId,
    divisionId,
    educationDegreeId }: CreateEmployeeRequestParams): Promise<EmployeeModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = await EmployeeModel.create({
                name,
                positionId,
                divisionId,
                educationDegreeId
            });
            await results.reload({
                include: [PositionModel, DivisionModel, EducationDegreeModel]
            })
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}

export const updateEmployee = ({ id, name,
    positionId,
    divisionId,
    educationDegreeId }: updateEmployeeRequestParams): Promise<EmployeeModel> => {
    return new Promise(async (resolve, reject) => {
        try {
            let [employeeModel] = await EmployeeModel.upsert({
                id: id,
                name: name,
                positionId: positionId,
                divisionId: divisionId,
                educationDegreeId: educationDegreeId
            }, { returning: true });

            await employeeModel.reload({
                include: [PositionModel, DivisionModel, EducationDegreeModel]
            })
            return resolve(employeeModel);
        } catch (e) {
            reject(e);
        }
    })
}
export const deleteEmployee = (id: number): Promise<number> => {
    return new Promise(async (resolve, reject) => {
        try {
            const contractModels = await contractService.findContractBy({ employee_id: id })
            if (contractModels && contractModels.length > 0) {
                await contractService.deleteContract({ employee_id: id })
            }
            let results = await EmployeeModel.destroy({
                where: { id: id }
            });
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}


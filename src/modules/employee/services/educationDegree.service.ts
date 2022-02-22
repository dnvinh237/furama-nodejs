import { AccompaniedServiceModel, CustomerTypeModel, DivisionModel, EducationDegreeModel, PositionModel, RentTypeModel } from '../../../models'


export const findAllEducationDegree = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = EducationDegreeModel.findAll();
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}
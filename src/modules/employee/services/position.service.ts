import { AccompaniedServiceModel, CustomerTypeModel, DivisionModel, EducationDegreeModel, PositionModel, RentTypeModel } from '../../../models'


export const findAllPosition = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = PositionModel.findAll();
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}
import { AccompaniedServiceModel, CustomerTypeModel, DivisionModel, EducationDegreeModel, PositionModel, RentTypeModel } from '../../../models'


export const findAllDivision = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = DivisionModel.findAll();
            return resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}
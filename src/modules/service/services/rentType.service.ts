import { RentTypeModel } from "../../../models";

export const findAllRentType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = RentTypeModel.findAll();
            return resolve(results);
        } catch (e) {
            reject(e);
        }
    })
}
import { AccompaniedServiceModel } from '../../../models'


export const findByIdAccompaniedService = async (id: number): Promise<AccompaniedServiceModel | null> =>
    AccompaniedServiceModel.findByPk(id)

export const findAllAccompaniedService = async (): Promise<AccompaniedServiceModel[]> =>
    AccompaniedServiceModel.findAll()
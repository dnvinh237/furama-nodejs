export interface CreateServiceRequestParams {
    code: String
    name: String
    area: Number
    numberOfFloor: Number
    cost: Number
    maxPeople: Number
    status: Number
}
export interface UpdateServiceRequestParams extends CreateServiceRequestParams {
    id: number
}
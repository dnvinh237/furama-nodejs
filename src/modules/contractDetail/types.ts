export interface CreateContractDetailRequestParams {
    quantity: number
    ContractId: number
    accompaniedServiceId: number
}

export interface UpdateContractDetailRequestParams extends CreateContractDetailRequestParams {
    id: number
}



export interface CreateContractRequestParams {
    startDate: String
    endDate: String
    deposit: String
    totalMoney: String
    employeeId: number
    customerId: number
    serviceId: number
}

export interface UpdateContractRequestParams extends CreateContractRequestParams {
    id: number
}
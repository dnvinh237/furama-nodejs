
export interface CreateCustomerRequestParams {
    code: string
    name: string
    dayOfBirth: string
    idCard: string
    phone: string
    email: string
    address: string
    customerTypeId: number
}

export interface UpdateCustomerRequestParams extends CreateCustomerRequestParams {
    id: number
}
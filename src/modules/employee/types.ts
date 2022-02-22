export interface CreateEmployeeRequestParams {
    name: string
    positionId: number
    divisionId: number
    educationDegreeId: number
}

export interface updateEmployeeRequestParams extends CreateEmployeeRequestParams {
    id: string
}

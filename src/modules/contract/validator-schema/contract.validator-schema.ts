import { Meta, ParamSchema } from 'express-validator'
import * as contractService from '../services'


const contractSchema: Record<string, ParamSchema> = {
    startDate: {
        in: ['body'],
        exists: {
            errorMessage: 'Start Date must not be empty',
        },
        customSanitizer: {
            options: (value: unknown): string => String(value)
        }
    }, endDate: {
        in: ['body'],
        exists: {
            errorMessage: 'End Date must not be empty',
        },
        customSanitizer: {
            options: (value: unknown): string => String(value)
        }
    }, employeeId: {
        in: ['body'],
        isInt: true,
        errorMessage: 'Employee id must be number',
        exists: {
            errorMessage: 'Employee id must not be empty',
        },
        customSanitizer: {
            options: (value: unknown): string => String(value)
        }
    }, id: {
        in: ['body'],
        custom: {
            options: async (value: string, { req }: Meta): Promise<unknown> => {
                if (req.method === 'PUT') {
                    if (value == null) return Promise.reject('id must not be empty')
                    if (isNaN(parseInt(value))) {
                        return Promise.reject('id must be number')
                    }
                    const existedEmployee = await contractService.findByIdContract(
                        parseInt(value)
                    )
                    if (existedEmployee == null)
                        return Promise.reject('employee bank card does not exist')
                }
                return true
            }
        }
    }
}
export default contractSchema
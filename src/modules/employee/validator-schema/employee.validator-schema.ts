import { Meta, ParamSchema } from 'express-validator'
import * as employeeService from '../services'
const employeeSchema: Record<string, ParamSchema> = {
    name: {
        in: ['body'],
        exists: {
            errorMessage: 'Employee name must not be empty',
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
                    const existedEmployee = await employeeService.findByIdEmployee(
                        parseInt(value)
                    )
                    if (existedEmployee == null)
                        return Promise.reject('Employee does not exist')
                }
                return true
            }
        }
    }
}
export default employeeSchema
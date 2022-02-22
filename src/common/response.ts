import { HttpStatusCode } from '../enums'

export class Response {
  public code: HttpStatusCode
  public status: string
  public data: unknown
  constructor(code: HttpStatusCode, status: string, data?: unknown) {
    this.code = code
    this.status = status
    this.data = data || null
  }
}

export class HttpError extends Error {
  public code: HttpStatusCode
  public message: string
  public errors?: unknown
  constructor(httpCode: HttpStatusCode, message: string, errors?: unknown) {
    super()
    this.code = httpCode
    this.message = message
    this.errors = errors || []
  }
}

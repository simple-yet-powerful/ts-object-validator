import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_STRING = 'NOT_STRING'

export const isStringDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} is not a string`

export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

export function IsString(options?: ValidatorOptions): PropertyValidator {
  return function IsString(value, context, done) {
    isString(value) || done(ValidationError.of(NOT_STRING, value, context, isStringDefaultErrorMessage, options))
  }
}

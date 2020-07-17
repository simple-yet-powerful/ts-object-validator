import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_ARRAY = 'NOT_ARRAY'

export const isArrayDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} is not an array`

export function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

export function IsArray(options?: ValidatorOptions): PropertyValidator {
  return function IsArray(value, context, done) {
    isArray(value) || done(ValidationError.of(NOT_ARRAY, value, context, isArrayDefaultErrorMessage, options))
  }
}

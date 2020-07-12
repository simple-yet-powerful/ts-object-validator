import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_NUMBER = 'NOT_NUMBER'

export const isNumberDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} is not a number`

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function IsNumber(options?: ValidatorOptions): PropertyValidator {
  return function (value, context, done) {
    isNumber(value) || done(ValidationError.of(NOT_NUMBER, value, context, isNumberDefaultErrorMessage, options))
  }
}

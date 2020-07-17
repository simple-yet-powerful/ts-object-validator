import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isNumber } from './IsNumber'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_INTEGER = 'NOT_INTEGER'

export const isIntegerDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) =>
  `${propertyKey} is not an integer number`

export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value)
}

export function IsInteger(options?: ValidatorOptions): PropertyValidator {
  return function IsInteger(value, context, done) {
    isInteger(value) || done(ValidationError.of(NOT_INTEGER, value, context, isIntegerDefaultErrorMessage, options))
  }
}

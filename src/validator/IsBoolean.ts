import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_BOOLEAN = 'NOT_BOOLEAN'

export const isBooleanDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) =>
  `${propertyKey} is not a boolean value`

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function IsBoolean(options?: ValidatorOptions): PropertyValidator {
  return function (value, context, done) {
    isBoolean(value) || done(ValidationError.of(NOT_BOOLEAN, value, context, isBooleanDefaultErrorMessage, options))
  }
}

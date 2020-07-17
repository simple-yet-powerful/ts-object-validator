import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_DATE = 'NOT_DATE'

export const isDateDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) =>
  `${propertyKey} is not a Date object`

/**
 * Checks if `value` is a valid Date object.
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime())
}

export function IsDate(options?: ValidatorOptions): PropertyValidator {
  return function IsDate(value, context, done) {
    isDate(value) || done(ValidationError.of(NOT_DATE, value, context, isDateDefaultErrorMessage, options))
  }
}

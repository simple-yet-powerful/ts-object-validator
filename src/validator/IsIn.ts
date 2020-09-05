import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_IN = 'NOT_IN'

export const isInDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey, constraints: [values] }) =>
  `${propertyKey} must be must be one of the following values: ${(values as unknown[]).join(', ')}`

/**
 * Checks if `value` is within `values`.
 */
export function isIn(values: unknown[], value: unknown): boolean {
  return values.some((item) => item === value)
}

export function IsIn(values: unknown[], options?: ValidatorOptions): PropertyValidator {
  return function IsIn(value, context, done) {
    isIn(values, value) || done(ValidationError.of(NOT_IN, value, context, isInDefaultErrorMessage, options, [values]))
  }
}

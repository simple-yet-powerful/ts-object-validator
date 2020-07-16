import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_UNDEFINED = 'NOT_UNDEFINED'

export const isUndefinedDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) =>
  `${propertyKey} is not undefined`

export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

export function IsUndefined(options?: ValidatorOptions): PropertyValidator {
  return (value, context, done) => {
    isUndefined(value) ||
      done(ValidationError.of(NOT_UNDEFINED, value, context, isUndefinedDefaultErrorMessage, options))
  }
}

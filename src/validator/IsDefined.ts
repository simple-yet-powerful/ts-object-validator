import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const UNDEFINED = 'UNDEFINED'

export const isDefinedDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} is not defined`

export function isDefined(value: unknown): boolean {
  return value !== undefined && value !== null
}

export function IsDefined(options?: ValidatorOptions): PropertyValidator {
  return function IsDefined(value, context, done) {
    isDefined(value) || done(ValidationError.of(UNDEFINED, value, context, isDefinedDefaultErrorMessage, options))
  }
}

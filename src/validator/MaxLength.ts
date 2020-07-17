import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isString } from './IsString'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const MAX_LENGTH = 'MAX_LENGTH'

export const maxLengthDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey, constraints: [max] }) =>
  `${propertyKey}'s length must be shorter than or equal to ${max}`

export function maxLength(value: unknown, max: number): value is number {
  return isString(value) && value.length > max
}

export function MaxLength(max: number, options?: ValidatorOptions): PropertyValidator {
  return function MaxLength(value, context, done) {
    maxLength(value, max) &&
      done(ValidationError.of(MAX_LENGTH, value, context, maxLengthDefaultErrorMessage, options, [max]))
  }
}

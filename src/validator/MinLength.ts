import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isString } from './IsString'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const MIN_LENGTH = 'MIN_LENGTH'

export const minLengthDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey, constraints: [min] }) =>
  `${propertyKey}'s length must be longer than or equal to ${min}`

export function minLength(value: unknown, min: number): value is number {
  return isString(value) && value.length < min
}

export function MinLength(min: number, options?: ValidatorOptions): PropertyValidator {
  return function (value, context, done) {
    minLength(value, min) &&
      done(ValidationError.of(MIN_LENGTH, value, context, minLengthDefaultErrorMessage, options, [min]))
  }
}

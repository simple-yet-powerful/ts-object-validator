import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isString } from './IsString'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_EMAIL = 'NOT_EMAIL'

export const isEmailDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) =>
  `${propertyKey} is not a valid email address`

export function isEmail(value: unknown): value is string {
  return isString(value) && Boolean(value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
}

export function IsEmail(options?: ValidatorOptions): PropertyValidator {
  return function IsEmail(value, context, done) {
    isEmail(value) || done(ValidationError.of(NOT_EMAIL, value, context, isEmailDefaultErrorMessage, options))
  }
}

import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isNumber } from './IsNumber'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const IS_GREATER = 'IS_GREATER'

export const isGreaterDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey, contraints: [max] }) =>
  `${propertyKey} is greater than ${max}`

export function isGreater(value: unknown, max: number): value is number {
  return isNumber(value) && value > max
}

export function Max(max: number, options?: ValidatorOptions): PropertyValidator {
  return function (value, context, done) {
    isGreater(value, max) &&
      done(ValidationError.of(IS_GREATER, value, context, isGreaterDefaultErrorMessage, options, [max]))
  }
}

import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isNumber } from './IsNumber'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const IS_LOWER = 'IS_LOWER'

export const isLowerDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey, contraints: [min] }) =>
  `${propertyKey} is lower than ${min}`

export function isLower(value: unknown, min: number): value is number {
  return isNumber(value) && value < min
}

export function Min(min: number, options?: ValidatorOptions): PropertyValidator {
  return function (value, context, done) {
    isLower(value, min) &&
      done(ValidationError.of(IS_LOWER, value, context, isLowerDefaultErrorMessage, options, [min]))
  }
}

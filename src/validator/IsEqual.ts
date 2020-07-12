import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_EQUAL = 'NOT_EQUAL'

export const isEqualDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey, contraints: [reference] }) =>
  `${propertyKey} is not equal to \`${reference}\``

export function isEqual(reference: unknown, value: unknown): boolean {
  return reference === value
}

export function IsEqual(reference: unknown, options?: ValidatorOptions): PropertyValidator {
  return (value, context, done) => {
    isEqual(reference, value) ||
      done(ValidationError.of(NOT_EQUAL, value, context, isEqualDefaultErrorMessage, options, [reference]))
  }
}

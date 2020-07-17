import { ValidationSchema } from '../schema/ValidationSchema'
import { ObjectValidator } from '../validation/ObjectValidator'
import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NESTED_ERROR = 'NESTED_ERROR'

export const nestedDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} has errors`

export function Nested<T>(schema: ValidationSchema<T>, options?: ValidatorOptions): PropertyValidator {
  return function Nested(value, context, done) {
    const errors = ObjectValidator.of(schema).validate(value)
    if (errors.length > 0) {
      done(ValidationError.of(NESTED_ERROR, value, context, nestedDefaultErrorMessage, options, [], errors))
    }
  }
}

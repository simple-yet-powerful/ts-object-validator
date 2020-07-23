import { PropertyValidator, PropertyValidatorExecutor } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NOT_ARRAY = 'NOT_ARRAY'
export const INVALID_ARRAY = 'INVALID_ARRAY'

export const isArrayDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} is not an array`
export const invalidArrayDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} is invalid`

export function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

export function IsArray(
  entryValidators?: PropertyValidator | PropertyValidator[],
  options?: ValidatorOptions
): PropertyValidator {
  return function IsArray(value, context, done) {
    if (isArray(value)) {
      if (entryValidators) {
        const { propertyKey } = context
        const errors: ValidationError[] = []
        value.forEach((entry, index) => {
          const error = PropertyValidatorExecutor.of(`${propertyKey}[${index}]`, entryValidators).validate(entry)
          if (error) {
            errors.push(error)
          }
        })
        if (errors) {
          done(ValidationError.of(INVALID_ARRAY, value, context, invalidArrayDefaultErrorMessage, options, [], errors))
        }
      }
    } else {
      done(ValidationError.of(NOT_ARRAY, value, context, isArrayDefaultErrorMessage, options))
    }
  }
}

import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isString } from './IsString'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export const NO_MATCH = 'NO_MATCH'

export const matchDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey, contraints: [regexp] }) =>
  `${propertyKey} does not match with the following pattern \`${regexp}\``

export function match(value: unknown, pattern: RegExp): value is string {
  return isString(value) && Boolean(value.match(pattern))
}

export function Match(regexp: RegExp, options?: ValidatorOptions): PropertyValidator {
  return (value, context, done) => {
    match(value, regexp) ||
      done(ValidationError.of(NO_MATCH, value, context, matchDefaultErrorMessage, options, [regexp]))
  }
}

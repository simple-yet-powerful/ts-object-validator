import { PropertyValidator } from '../validation/PropertyValidator'
import { isOptional } from './IsOptional'
import { isString } from './IsString'

/**
 * Checks if `value` is an empty string (`undefined`, `null`, `''`).
 */
export function isEmpty(value: unknown): boolean {
  return isOptional(value) || (isString(value) && value.length === 0)
}

export function IsEmpty(): PropertyValidator {
  return (value, context, done) => {
    isEmpty(value) && done()
  }
}

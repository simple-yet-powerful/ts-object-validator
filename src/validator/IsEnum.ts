import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { ValidatorErrorMessage, ValidatorOptions } from './Validator'

export type EnumType = {
  [Key: number]: unknown
  [Key: string]: unknown
}

export const NOT_ENUM = 'NOT_ENUM'

export const isEnumDefaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) =>
  `${propertyKey} must be a valid enum value`

/**
 * Checks if `value` is a valid enum value of `entity`.
 */
export function isEnum<T>(entity: EnumType, value: unknown): value is T {
  return Object.values(entity).includes(value)
}

export function IsEnum(entity: EnumType, options?: ValidatorOptions): PropertyValidator {
  return function IsEnum(value, context, done) {
    isEnum(entity, value) ||
      done(ValidationError.of(NOT_ENUM, value, context, isEnumDefaultErrorMessage, options, [entity]))
  }
}

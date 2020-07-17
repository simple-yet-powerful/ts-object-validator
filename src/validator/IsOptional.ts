import { PropertyValidator } from '../validation/PropertyValidator'

export function isOptional(value: unknown): boolean {
  return value === undefined || value === null
}

export function IsOptional(): PropertyValidator {
  return function IsOptional(value, context, done) {
    isOptional(value) && done()
  }
}

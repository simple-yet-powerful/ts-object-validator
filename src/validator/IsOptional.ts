import { PropertyValidator } from '../validation/PropertyValidator'

export function isOptional(value: unknown): boolean {
  return value === undefined || value === null
}

export function IsOptional(): PropertyValidator {
  return (value, context, done) => {
    isOptional(value) && done()
  }
}

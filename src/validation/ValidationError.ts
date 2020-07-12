import { PropertyValidatorContext } from './PropertyValidator'
import { ValidatorOptions } from '../validator/Validator'

export type ValidatorErrorMessage = (context: { propertyKey: string; value: unknown; contraints: unknown[] }) => string

export const defaultErrorMessage: ValidatorErrorMessage = ({ propertyKey }) => `${propertyKey} is invalid`

export class ValidationError {
  constructor(
    readonly propertyKey: string,
    readonly value: unknown,
    readonly code: string,
    readonly message: string,
    readonly children?: ValidationError[]
  ) {}
  static of(
    type: string,
    value: unknown,
    context: PropertyValidatorContext,
    defaultMessage: ValidatorErrorMessage = defaultErrorMessage,
    options: ValidatorOptions = {},
    contraints: unknown[] = [],
    children?: ValidationError[]
  ): ValidationError {
    const { propertyKey } = context
    const message = (options?.message ?? defaultMessage)({ propertyKey, value, contraints })
    return new ValidationError(propertyKey, value, type, message, children)
  }
}

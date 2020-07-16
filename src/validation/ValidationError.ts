import { ValidatorErrorMessage, ValidatorOptions } from '../validator/Validator'
import { PropertyValidatorContext } from './PropertyValidator'

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
    code: string,
    value: unknown,
    context: PropertyValidatorContext,
    defaultMessage: ValidatorErrorMessage = defaultErrorMessage,
    options: ValidatorOptions = {},
    constraints: unknown[] = [],
    children?: ValidationError[]
  ): ValidationError {
    const { propertyKey } = context
    const message = (options?.message ?? defaultMessage)({ propertyKey, value, constraints: constraints })
    return new ValidationError(propertyKey, value, code, message, children)
  }
}

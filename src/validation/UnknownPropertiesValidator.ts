import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
import { ValidationError } from './ValidationError'

export const IS_UNKNOWN = 'IS_UNKNOWN'

export class UnknownPropertiesValidator<T> {
  constructor(public schema: ValidationSchemaInterface<T>) {}

  public shouldAllowUnknownProperties(): boolean {
    const value = this.schema.allowUnknownProperties
    return value === undefined || value === false || Array.isArray(value)
  }

  public getKnownProperties(): string[] {
    const allowedUnknownProperties = Array.isArray(this.schema.allowUnknownProperties)
      ? this.schema.allowUnknownProperties
      : []
    const schemaProperties = Object.keys(this.schema.properties)
    return [...schemaProperties, ...allowedUnknownProperties]
  }

  /**
   * Reports unknown properties from `object`.
   */
  public validate<T>(object: T): ValidationError[] {
    const errors: ValidationError[] = []
    if (this.shouldAllowUnknownProperties()) {
      const objectProperties = object ? Object.keys(object) : []
      const knownProperties = this.getKnownProperties()
      objectProperties.forEach((objectProperty) => {
        if (!knownProperties.includes(objectProperty)) {
          errors.push(
            new ValidationError(
              objectProperty,
              (object as Record<string, unknown>)[objectProperty],
              IS_UNKNOWN,
              `Unknown property: ${objectProperty}`
            )
          )
        }
      })
    }
    return errors
  }
}

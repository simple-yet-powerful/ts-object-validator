import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
import { ValidationError } from './ValidationError'

export const IS_MISSING = 'IS_MISSING'

export class MissingPropertiesValidator<T> {
  constructor(public schema: ValidationSchemaInterface<T>) {}

  public shouldValidateMissingProperties(): boolean {
    const value = this.schema.allowMissingProperties
    return value === undefined || value === false || Array.isArray(value)
  }

  public getKnownProperties(): string[] {
    const allowedMissingProperties = Array.isArray(this.schema.allowMissingProperties)
      ? (this.schema.allowMissingProperties as string[])
      : []
    return Object.keys(this.schema.properties).filter((property) => !allowedMissingProperties.includes(property))
  }

  /**
   * Reports missing properties from `object`.
   */
  public validate<T>(object: T): ValidationError[] {
    const errors: ValidationError[] = []
    if (this.shouldValidateMissingProperties()) {
      const objectProperties = Object.keys(object ?? {})
      const knownProperties = this.getKnownProperties()
      knownProperties.forEach((knownProperty) => {
        if (!objectProperties.includes(knownProperty)) {
          errors.push(new ValidationError(knownProperty, undefined, IS_MISSING, `Missing property: ${knownProperty}`))
        }
      })
    }
    return errors
  }
}

import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
import { Nested } from '../validator/Nested'
import { ValidationOptions } from './ObjectValidator'
import { PropertyValidator, PropertyValidatorExecutor } from './PropertyValidator'
import { ValidationError } from './ValidationError'

export class ObjectPropertiesValidator<T> {
  constructor(public schema: ValidationSchemaInterface<T>) {}

  /**
   * Get the validators from the `schema` related to `propertyKey`.
   */
  public getPropertyValidators<T>(propertyKey: string): PropertyValidator[] {
    const schemaProperties = this.schema.properties as Record<
      string,
      PropertyValidator | PropertyValidator[] | ValidationSchemaInterface<T>
    >
    const validators = schemaProperties[propertyKey] ?? []
    if (Array.isArray(validators)) {
      return validators
    }
    if (typeof validators === 'function') {
      return [validators as PropertyValidator]
    }
    return [Nested<T>(validators as ValidationSchemaInterface<T>)]
  }

  /**
   * Validates properties from `object`.
   */
  public validate<T>(object: T, options: ValidationOptions = {}): ValidationError[] {
    const errors: ValidationError[] = []
    const objectEntries = Object.entries(object ?? {})
    objectEntries.forEach(([propertyKey, value]) => {
      const validators = this.getPropertyValidators<typeof value>(propertyKey)
      const error = PropertyValidatorExecutor.of(propertyKey, validators).validate(value, options)
      if (error) {
        errors.push(error)
      }
    })
    return errors
  }
}

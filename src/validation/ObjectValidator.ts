import { ValidationSchema } from '../schema/ValidationSchema'
import { Nested } from '../validator/Nested'
import { PropertyValidator, PropertyValidatorExecutor } from './PropertyValidator'
import { ValidationError } from './ValidationError'

export const IS_MISSING = 'IS_MISSING'
export const IS_UNKNOWN = 'IS_UNKNOWN'

export type ValidationOptions = {
  group?: string
}

export class ObjectValidator<T> {
  constructor(public schema: ValidationSchema<T>) {}

  static of<T>(schema: ValidationSchema<T>): ObjectValidator<T> {
    return new this(schema)
  }

  /**
   * Reports missing properties from `object`.
   */
  public validateMissingProperties<T>(object: T): ValidationError[] {
    const errors: ValidationError[] = []
    const objectProperties = Object.keys(object ?? {})
    const schemaProperties = Object.keys(this.schema.properties)
    schemaProperties.forEach((schemaProperty) => {
      if (!objectProperties.includes(schemaProperty)) {
        errors.push(new ValidationError(schemaProperty, undefined, IS_MISSING, `Missing property: ${schemaProperty}`))
      }
    })
    return errors
  }

  /**
   * Reports unknown properties from `object`.
   */
  public validateUnknownProperties<T>(object: T): ValidationError[] {
    const errors: ValidationError[] = []
    const objectProperties = Object.keys(object ?? {})
    const schemaProperties = Object.keys(this.schema.properties)
    objectProperties.forEach((objectProperty) => {
      if (!schemaProperties.includes(objectProperty)) {
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
    return errors
  }

  /**
   * Get the validators from the `schema` related to `propertyKey`.
   */
  public getPropertyValidators<T>(propertyKey: string): PropertyValidator[] {
    const schemaProperties = this.schema.properties as Record<
      string,
      PropertyValidator | PropertyValidator[] | ValidationSchema<T>
    >
    const validators = schemaProperties[propertyKey] ?? []
    if (Array.isArray(validators)) {
      return validators
    }
    if (typeof validators === 'function') {
      return [validators as PropertyValidator]
    }
    return [Nested<T>(validators as ValidationSchema<T>)]
  }

  /**
   * Validates know and existing properties from `object`.
   */
  public validateProperties<T>(object: T, options: ValidationOptions = {}): ValidationError[] {
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

  /**
   * Reports validation errors from `object`.
   */
  public validate<T>(object: T, options?: ValidationOptions): ValidationError[] {
    const errors: ValidationError[] = []
    !this.schema.allowMissingProperties && errors.push(...this.validateMissingProperties(object))
    !this.schema.allowUnknownProperties && errors.push(...this.validateUnknownProperties(object))
    errors.push(...this.validateProperties(object, options))
    return errors
  }
}

import 'reflect-metadata'
import { VALIDATOR_METADATA_KEY } from '../decorator/ValidationSchema'
import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
import { MissingPropertiesValidator } from './MissingPropertiesValidator'
import { ObjectPropertiesValidator } from './ObjectPropertiesValidator'
import { UnknownPropertiesValidator } from './UnknownPropertiesValidator'
import { ValidationError } from './ValidationError'

export type ValidationOptions = {
  group?: string
}

export class ObjectValidator<T> {
  constructor(public schema: ValidationSchemaInterface<T>) {}

  static of<T>(classType: { new (): T }): ObjectValidator<T>
  static of<T>(schema: ValidationSchemaInterface<T>): ObjectValidator<T>
  static of<T>(schema: ValidationSchemaInterface<T> | { new (): T }): ObjectValidator<T> {
    return typeof schema === 'object'
      ? new this(schema as ValidationSchemaInterface<T>)
      : (Reflect.getMetadata(VALIDATOR_METADATA_KEY, schema) as ObjectValidator<T>)
  }

  /**
   * Reports validation errors from `object`.
   */
  public validate<T>(object: T, options?: ValidationOptions): ValidationError[] {
    const errors: ValidationError[] = []
    errors.push(...new MissingPropertiesValidator(this.schema).validate(object))
    errors.push(...new UnknownPropertiesValidator(this.schema).validate(object))
    errors.push(...new ObjectPropertiesValidator(this.schema).validate(object, options))
    return errors
  }
}

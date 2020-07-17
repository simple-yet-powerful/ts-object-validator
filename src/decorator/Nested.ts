/* eslint-disable @typescript-eslint/ban-types */
import { ValidationSchema } from '../schema'
import { Nested as NestedValidator } from '../validator/Nested'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function Nested<T>(schema: ValidationSchema<T>, options?: ValidatorOptions): PropertyDecorator {
  return function Nested(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, NestedValidator(schema, options))
  }
}

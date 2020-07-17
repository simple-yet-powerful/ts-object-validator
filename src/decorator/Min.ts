/* eslint-disable @typescript-eslint/ban-types */
import { Min as MinValidator } from '../validator/Min'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function Min(min: number, options?: ValidatorOptions): PropertyDecorator {
  return function Min(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, MinValidator(min, options))
  }
}

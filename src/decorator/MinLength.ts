/* eslint-disable @typescript-eslint/ban-types */
import { MinLength as MinLengthValidator } from '../validator/MinLength'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function MinLength(min: number, options?: ValidatorOptions): PropertyDecorator {
  return function MinLength(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, MinLengthValidator(min, options))
  }
}

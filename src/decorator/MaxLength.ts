/* eslint-disable @typescript-eslint/ban-types */
import { MaxLength as MaxLengthValidator } from '../validator/MaxLength'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function MaxLength(max: number, options?: ValidatorOptions): PropertyDecorator {
  return function MaxLength(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, MaxLengthValidator(max, options))
  }
}

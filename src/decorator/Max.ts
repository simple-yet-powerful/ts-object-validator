/* eslint-disable @typescript-eslint/ban-types */
import { Max as MaxValidator } from '../validator/Max'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function Max(max: number, options?: ValidatorOptions): PropertyDecorator {
  return function Max(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, MaxValidator(max, options))
  }
}

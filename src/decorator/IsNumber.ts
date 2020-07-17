/* eslint-disable @typescript-eslint/ban-types */
import { IsNumber as IsNumberValidator } from '../validator/IsNumber'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsNumber(options?: ValidatorOptions): PropertyDecorator {
  return function IsNumber(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsNumberValidator(options))
  }
}

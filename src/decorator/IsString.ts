/* eslint-disable @typescript-eslint/ban-types */
import { IsString as IsStringValidator } from '../validator/IsString'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsString(options?: ValidatorOptions): PropertyDecorator {
  return function IsString(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsStringValidator(options))
  }
}

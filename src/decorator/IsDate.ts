/* eslint-disable @typescript-eslint/ban-types */
import { IsDate as IsDateValidator } from '../validator/IsDate'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsDate(options?: ValidatorOptions): PropertyDecorator {
  return function IsDate(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsDateValidator(options))
  }
}

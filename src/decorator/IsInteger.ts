/* eslint-disable @typescript-eslint/ban-types */
import { IsInteger as IsIntegerValidator } from '../validator/IsInteger'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsInteger(options?: ValidatorOptions): PropertyDecorator {
  return function IsInteger(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsIntegerValidator(options))
  }
}

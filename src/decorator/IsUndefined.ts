/* eslint-disable @typescript-eslint/ban-types */
import { IsUndefined as IsUndefinedValidator } from '../validator/IsUndefined'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsUndefined(options?: ValidatorOptions): PropertyDecorator {
  return function IsUndefined(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsUndefinedValidator(options))
  }
}

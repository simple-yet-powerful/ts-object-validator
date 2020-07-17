/* eslint-disable @typescript-eslint/ban-types */
import { IsBoolean as IsBooleanValidator } from '../validator/IsBoolean'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsBoolean(options?: ValidatorOptions): PropertyDecorator {
  return function IsBoolean(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsBooleanValidator(options))
  }
}

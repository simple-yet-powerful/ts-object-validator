/* eslint-disable @typescript-eslint/ban-types */
import { EnumType, IsEnum as IsEnumValidator } from '../validator/IsEnum'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsEnum(entity: EnumType, options?: ValidatorOptions): PropertyDecorator {
  return function IsEnum(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsEnumValidator(entity, options))
  }
}

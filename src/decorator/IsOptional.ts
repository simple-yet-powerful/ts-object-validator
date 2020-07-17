/* eslint-disable @typescript-eslint/ban-types */
import { IsOptional as IsOptionalValidator } from '../validator/IsOptional'
import { SchemaBuilder } from './Validate'

export function IsOptional(): PropertyDecorator {
  return function IsOptional(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsOptionalValidator())
  }
}

/* eslint-disable @typescript-eslint/ban-types */
import { IsEmpty as IsEmptyValidator } from '../validator/IsEmpty'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsEmpty(): PropertyDecorator {
  return function IsEmpty(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsEmptyValidator())
  }
}

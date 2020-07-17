/* eslint-disable @typescript-eslint/ban-types */
import { IsEqual as IsEqualValidator } from '../validator/IsEqual'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsEqual(options?: ValidatorOptions): PropertyDecorator {
  return function IsEqual(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsEqualValidator(options))
  }
}

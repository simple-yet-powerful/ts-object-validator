/* eslint-disable @typescript-eslint/ban-types */
import { IsDefined as IsDefinedValidator } from '../validator/IsDefined'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsDefined(options?: ValidatorOptions): PropertyDecorator {
  return function IsDefined(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsDefinedValidator(options))
  }
}

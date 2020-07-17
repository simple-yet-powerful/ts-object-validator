/* eslint-disable @typescript-eslint/ban-types */
import { IsEmail as IsEmailValidator } from '../validator/IsEmail'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function IsEmail(options?: ValidatorOptions): PropertyDecorator {
  return function IsEmail(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IsEmailValidator(options))
  }
}

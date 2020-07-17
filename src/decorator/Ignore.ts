/* eslint-disable @typescript-eslint/ban-types */
import { Ignore as IgnoreValidator } from '../validator/Ignore'
import { SchemaBuilder } from './Validate'

export function Ignore(): PropertyDecorator {
  return function Ignore(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, IgnoreValidator())
  }
}

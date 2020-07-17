/* eslint-disable @typescript-eslint/ban-types */
import { Match as MatchValidator } from '../validator/Match'
import { ValidatorOptions } from '../validator/Validator'
import { SchemaBuilder } from './Validate'

export function Match(regexp: RegExp, options?: ValidatorOptions): PropertyDecorator {
  return function Match(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, MatchValidator(regexp, options))
  }
}

/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata'
import { ValidationSchemaOptions } from '../schema/ValidationSchemaInterface'
import { ObjectValidator } from '../validation/ObjectValidator'
import { SchemaBuilder } from './SchemaBuilder'

export const VALIDATOR_METADATA_KEY = 'ObjectValidator'

export function ValidationSchema(options?: ValidationSchemaOptions): ClassDecorator {
  return function (target) {
    const schema = SchemaBuilder.of(target, options).build()
    const validator = ObjectValidator.of(schema)
    Reflect.defineMetadata(VALIDATOR_METADATA_KEY, validator, target)
  }
}

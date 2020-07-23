/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata'
import { PropertyValidator } from '../validation/PropertyValidator'
import { SchemaBuilder } from './SchemaBuilder'

export function Validate(validators: PropertyValidator | PropertyValidator[]): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, validators)
  }
}

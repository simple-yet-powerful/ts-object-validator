/* eslint-disable @typescript-eslint/ban-types */
import { PropertyValidator } from '../validation'
import { Group as GroupValidator } from '../validator/Group'
import { SchemaBuilder } from './Validate'

export function Group(name: string, validators: PropertyValidator | PropertyValidator[]): PropertyDecorator {
  return function Group(target: Object, propertyKey: string | symbol) {
    SchemaBuilder.of(target.constructor).useValidator(propertyKey, GroupValidator(name, validators))
  }
}

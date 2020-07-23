/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata'
import { ValidationSchema, ValidationSchemaOptions } from '../schema/ValidationSchema'
import { PropertyValidator } from '../validation/PropertyValidator'

export const METADATA_KEY = 'ObjectValidator'

export class SchemaBuilder {
  readonly properties: { [propertyKey: string]: PropertyValidator[] } = {}
  private constructor(private target: Object, public options?: ValidationSchemaOptions) {}
  static of(target: Object, options?: ValidationSchemaOptions): SchemaBuilder {
    const translatedTarget = typeof target === 'object' ? target.constructor : target
    if (Reflect.hasMetadata(METADATA_KEY, translatedTarget)) {
      const builder = Reflect.getMetadata(METADATA_KEY, translatedTarget) as SchemaBuilder
      builder.options = options
      return builder
    }
    const builder = new SchemaBuilder(translatedTarget, options)
    Reflect.defineMetadata(METADATA_KEY, builder, translatedTarget)
    return builder
  }
  useValidator(propertyKey: string | symbol, validators: PropertyValidator | PropertyValidator[]): this {
    validators = Array.isArray(validators) ? validators : [validators]
    validators.forEach((validator) => {
      const propertyValidators = this.properties[propertyKey as string] ?? []
      propertyValidators.push(validator)
      this.properties[propertyKey as string] = propertyValidators
    })
    return this
  }
  build(): ValidationSchema {
    const { options, properties } = this
    return { ...options, properties }
  }
}

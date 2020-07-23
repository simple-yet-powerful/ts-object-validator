/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata'
import { ValidationSchemaInterface, ValidationSchemaOptions } from '../schema/ValidationSchemaInterface'
import { PropertyValidator } from '../validation/PropertyValidator'

export const SCHEMA_METADATA_KEY = 'SchemaBuilder'

export class SchemaBuilder {
  readonly properties: { [propertyKey: string]: PropertyValidator[] } = {}

  private constructor(private target: Object, public options?: ValidationSchemaOptions) {}

  static of(target: Object, options?: ValidationSchemaOptions): SchemaBuilder {
    const translatedTarget = typeof target === 'object' ? target.constructor : target
    if (Reflect.hasMetadata(SCHEMA_METADATA_KEY, translatedTarget)) {
      const builder = Reflect.getMetadata(SCHEMA_METADATA_KEY, translatedTarget) as SchemaBuilder
      builder.options = options
      return builder
    }
    const builder = new SchemaBuilder(translatedTarget, options)
    Reflect.defineMetadata(SCHEMA_METADATA_KEY, builder, translatedTarget)
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

  build(): ValidationSchemaInterface {
    const { options, properties } = this
    return { ...options, properties }
  }
}

import { PropertyValidator } from '../validation/PropertyValidator'

export interface ValidationSchemaOptions {
  name?: string
  allowUnknownProperties?: boolean
  allowMissingProperties?: boolean
}

export interface ValidationSchema<T = unknown> extends ValidationSchemaOptions {
  properties: {
    [K in keyof Required<T>]: PropertyValidator | PropertyValidator[] | ValidationSchema<T[K]>
  }
}

import { PropertyValidator } from '../validation/PropertyValidator'

export type ValidationSchemaOptions = {
  name?: string
  allowUnknownProperties?: boolean
  allowMissingProperties?: boolean
}

export interface ValidationSchemaInterface<T = unknown> extends ValidationSchemaOptions {
  properties: {
    [K in keyof Required<T>]: PropertyValidator | PropertyValidator[] | ValidationSchemaInterface<T[K]>
  }
}

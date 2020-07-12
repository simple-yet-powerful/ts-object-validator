import { PropertyValidator } from '../validation/PropertyValidator'

export interface ValidationSchema<T = unknown> {
  name?: string
  allowUnknownProperties?: boolean
  allowMissingProperties?: boolean
  properties: {
    [K in keyof Required<T>]: PropertyValidator | PropertyValidator[] | ValidationSchema<T[K]>
  }
}

import { PropertyValidator } from '../validation/PropertyValidator'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidationSchemaOptions<T = any> = {
  name?: string
  allowUnknownProperties?: boolean | string[]
  allowMissingProperties?: boolean | (keyof Required<T>)[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ValidationSchemaInterface<T = any> extends ValidationSchemaOptions<T> {
  properties: {
    [K in keyof Required<T>]: PropertyValidator | PropertyValidator[] | ValidationSchemaInterface<T[K]>
  }
}

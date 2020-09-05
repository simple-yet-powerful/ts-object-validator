import { PropertyValidator } from '../validation/PropertyValidator'

export type ValidationSchemaOptions<T = unknown> = {
  name?: string
  allowUnknownProperties?: boolean | string[]
  // eslint-disable-next-line @typescript-eslint/ban-types
  allowMissingProperties?: boolean | (T extends object ? keyof Required<T> : string)[]
}

export interface ValidationSchemaInterface<T = unknown> extends ValidationSchemaOptions<T> {
  properties: {
    [K in keyof Required<T>]: PropertyValidator | PropertyValidator[] | ValidationSchemaInterface<T[K]>
  }
}

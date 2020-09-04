import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
import { PropertyValidator } from './PropertyValidator'
import { UnknownPropertiesValidator } from './UnknownPropertiesValidator'

const Ignore: PropertyValidator = (value, ctx, done): void => done()

describe('UnknownPropertiesValidator', () => {
  test('OK', () => {
    const schema: ValidationSchemaInterface = {
      properties: {
        prop1: Ignore,
      },
    }
    const errors = new UnknownPropertiesValidator(schema).validate({
      prop1: false,
      prop2: false,
    })
    expect(errors).toHaveLength(1)
    expect(errors[0].propertyKey).toBe('prop2')
    expect(errors[0].code).toBe('IS_UNKNOWN')
    expect(errors[0].message).toBe('Unknown property: prop2')
  })
})

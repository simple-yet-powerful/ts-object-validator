import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
import { MissingPropertiesValidator } from './MissingPropertiesValidator'
import { PropertyValidator } from './PropertyValidator'

const Ignore: PropertyValidator = (value, ctx, done): void => done()

describe('MissingPropertiesValidator', () => {
  it('reports missing properties', () => {
    const schema: ValidationSchemaInterface = {
      properties: {
        prop1: Ignore,
        prop2: Ignore,
      },
    }
    const errors = new MissingPropertiesValidator(schema).validate({})
    expect(errors).toHaveLength(2)
    expect(errors[0].propertyKey).toBe('prop1')
    expect(errors[0].code).toBe('IS_MISSING')
    expect(errors[0].message).toBe('Missing property: prop1')
    expect(errors[1].propertyKey).toBe('prop2')
    expect(errors[1].code).toBe('IS_MISSING')
    expect(errors[1].message).toBe('Missing property: prop2')
  })
  test('allowMissingProperties: true', () => {
    const schema: ValidationSchemaInterface = {
      allowMissingProperties: true,
      properties: {
        prop1: Ignore,
        prop2: Ignore,
      },
    }
    const errors = new MissingPropertiesValidator(schema).validate({})
    expect(errors).toHaveLength(0)
  })
  test('allowMissingProperties: []', () => {
    const schema: ValidationSchemaInterface = {
      allowMissingProperties: ['prop3'],
      properties: {
        prop1: Ignore,
        prop2: Ignore,
      },
    }
    const errors = new MissingPropertiesValidator(schema).validate({ prop1: true })
    expect(errors).toHaveLength(1)
    expect(errors[0].propertyKey).toBe('prop2')
    expect(errors[0].code).toBe('IS_MISSING')
    expect(errors[0].message).toBe('Missing property: prop2')
  })
})

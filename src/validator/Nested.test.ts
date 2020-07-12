import { ValidationSchema } from '../schema/ValidationSchema'
import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { Nested } from './Nested'

describe('Nested', () => {
  const IsError: PropertyValidator = (value: unknown, { propertyKey }, done): void => {
    value && done(new ValidationError(propertyKey, value, 'IS_ERROR', `${propertyKey} is invalid`))
  }
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    const propertyKey = 'prop1'
    const done = jest.fn()
    const schema: ValidationSchema = {
      properties: {
        nestedProp1: IsError,
      },
    }
    Nested(schema)({ nestedProp1: false }, { propertyKey }, done)
    expect(done).toHaveBeenCalledTimes(0)
  })
  test('ValidationError', () => {
    const propertyKey = 'prop1'
    const done = jest.fn()
    const schema: ValidationSchema = {
      properties: {
        nestedProp1: IsError,
      },
    }
    Nested(schema)({ nestedProp1: true }, { propertyKey }, done)
    expect(done).toHaveBeenCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NESTED_ERROR')
    expect(error.message).toBe('prop1 has errors')
    expect(error.children).toHaveLength(1)
    expect(error.children?.[0].propertyKey).toBe('nestedProp1')
    expect(error.children?.[0].code).toBe('IS_ERROR')
    expect(error.children?.[0].message).toBe('nestedProp1 is invalid')
  })
})

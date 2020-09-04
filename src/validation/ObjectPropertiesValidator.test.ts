import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
import { Nested } from '../validator/Nested'
import { ObjectValidator } from './ObjectValidator'
import { PropertyValidator } from './PropertyValidator'
import { ValidationError } from './ValidationError'

/**
 * Raises an error if `value` is truthy
 */
const IsError: PropertyValidator = (value, { propertyKey }, done): void => {
  Boolean(value) && done(new ValidationError(propertyKey, value, 'IS_ERROR', `${propertyKey} is invalid`))
}

describe('ObjectPropertiesValidator', () => {
  const schema: ValidationSchemaInterface = {
    properties: {
      prop1: IsError,
      prop2: IsError,
      prop3: IsError,
    },
  }
  test('IsError works properly', () => {
    const done = jest.fn()
    IsError(true, { propertyKey: 'testProp' }, done)
    expect(done).toHaveBeenCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
  })
  test('Invalid properties', () => {
    const errors = ObjectValidator.of(schema).validate({ prop1: false, prop2: true, prop3: true })
    expect(errors).toHaveLength(2)
    expect(errors[0].propertyKey).toBe('prop2')
    expect(errors[0].code).toBe('IS_ERROR')
    expect(errors[0].message).toBe('prop2 is invalid')
    expect(errors[1].propertyKey).toBe('prop3')
    expect(errors[1].code).toBe('IS_ERROR')
    expect(errors[1].message).toBe('prop3 is invalid')
  })
})
describe('ObjectPropertiesValidator > Nested objects', () => {
  class TestNestedClass {
    constructor(public nestedProp1?: boolean, public nestedProp2?: boolean) {}
  }
  class TestClass {
    constructor(public prop1?: boolean, public prop2?: boolean, public prop3?: TestNestedClass) {}
  }
  test('with ValidationSchemaInterface', () => {
    const schema: ValidationSchemaInterface<TestClass> = {
      properties: {
        prop1: IsError,
        prop2: IsError,
        prop3: {
          properties: {
            nestedProp1: IsError,
            nestedProp2: IsError,
          },
        },
      },
    }
    const value = new TestClass(true, true, new TestNestedClass(true, true))
    const errors = ObjectValidator.of(schema).validate(value)
    expect(errors).toHaveLength(3)
    expect(errors[0].propertyKey).toBe('prop1')
    expect(errors[0].code).toBe('IS_ERROR')
    expect(errors[1].propertyKey).toBe('prop2')
    expect(errors[1].code).toBe('IS_ERROR')
    expect(errors[2].propertyKey).toBe('prop3')
    expect(errors[2].code).toBe('NESTED_ERROR')
    expect(errors[2].children).toHaveLength(2)
    expect(errors[2].children?.[0].propertyKey).toBe('nestedProp1')
    expect(errors[2].children?.[0].code).toBe('IS_ERROR')
    expect(errors[2].children?.[1].propertyKey).toBe('nestedProp2')
    expect(errors[2].children?.[1].code).toBe('IS_ERROR')
  })
  test('with Nested()', () => {
    const schema: ValidationSchemaInterface<TestClass> = {
      properties: {
        prop1: IsError,
        prop2: IsError,
        prop3: Nested<TestNestedClass>({
          properties: {
            nestedProp1: IsError,
            nestedProp2: IsError,
          },
        }),
      },
    }
    const value = new TestClass(true, true, new TestNestedClass(true, true))
    const errors = ObjectValidator.of(schema).validate(value)
    expect(errors).toHaveLength(3)
    expect(errors[0].propertyKey).toBe('prop1')
    expect(errors[0].code).toBe('IS_ERROR')
    expect(errors[1].propertyKey).toBe('prop2')
    expect(errors[1].code).toBe('IS_ERROR')
    expect(errors[2].propertyKey).toBe('prop3')
    expect(errors[2].code).toBe('NESTED_ERROR')
    expect(errors[2].children).toHaveLength(2)
    expect(errors[2].children?.[0].propertyKey).toBe('nestedProp1')
    expect(errors[2].children?.[0].code).toBe('IS_ERROR')
    expect(errors[2].children?.[1].propertyKey).toBe('nestedProp2')
    expect(errors[2].children?.[1].code).toBe('IS_ERROR')
  })
})

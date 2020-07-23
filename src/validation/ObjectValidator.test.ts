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

describe('ObjectValidator with ValidationSchemaInterface<unkown>', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
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
  test('Missing properties', () => {
    const errors = ObjectValidator.of(schema).validate({ prop1: false })
    expect(errors).toHaveLength(2)
    expect(errors[0].propertyKey).toBe('prop2')
    expect(errors[0].code).toBe('IS_MISSING')
    expect(errors[0].message).toBe('Missing property: prop2')
    expect(errors[1].propertyKey).toBe('prop3')
    expect(errors[1].code).toBe('IS_MISSING')
    expect(errors[1].message).toBe('Missing property: prop3')
  })
  test('Unknown properties', () => {
    const errors = ObjectValidator.of(schema).validate({
      prop1: false,
      prop2: false,
      prop3: false,
      wrongProp1: false,
      wrongProp2: false,
    })
    expect(errors).toHaveLength(2)
    expect(errors[0].propertyKey).toBe('wrongProp1')
    expect(errors[0].code).toBe('IS_UNKNOWN')
    expect(errors[0].message).toBe('Unknown property: wrongProp1')
    expect(errors[1].propertyKey).toBe('wrongProp2')
    expect(errors[1].code).toBe('IS_UNKNOWN')
    expect(errors[1].message).toBe('Unknown property: wrongProp2')
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
  test('Mix errors', () => {
    const errors = ObjectValidator.of(schema).validate({
      prop1: false,
      prop2: true,
      wrongProp1: false,
    })
    expect(errors).toHaveLength(3)
    expect(errors[0].propertyKey).toBe('prop3')
    expect(errors[0].code).toBe('IS_MISSING')
    expect(errors[1].propertyKey).toBe('wrongProp1')
    expect(errors[1].code).toBe('IS_UNKNOWN')
    expect(errors[2].propertyKey).toBe('prop2')
    expect(errors[2].code).toBe('IS_ERROR')
  })
})
describe('ObjectValidator > with ValidationSchemaInterface<T>', () => {
  class TestClass {
    constructor(public prop1?: boolean, public prop2?: boolean, public prop3?: boolean) {}
  }
  test('class object', () => {
    const schema: ValidationSchemaInterface<TestClass> = {
      properties: {
        prop1: IsError,
        prop2: IsError,
        prop3: IsError,
      },
    }
    const errors = ObjectValidator.of(schema).validate(new TestClass(true, true, false))
    expect(errors).toHaveLength(2)
    expect(errors[0].propertyKey).toBe('prop1')
    expect(errors[0].code).toBe('IS_ERROR')
    expect(errors[1].propertyKey).toBe('prop2')
    expect(errors[1].code).toBe('IS_ERROR')
  })
  test('plain object', () => {
    const schema: ValidationSchemaInterface<TestClass> = {
      properties: {
        prop1: IsError,
        prop2: IsError,
        prop3: IsError,
      },
    }
    const value = {
      prop1: true,
      prop2: true,
      prop3: false,
    }
    const errors = ObjectValidator.of(schema).validate(value)
    expect(errors).toHaveLength(2)
    expect(errors[0].propertyKey).toBe('prop1')
    expect(errors[0].code).toBe('IS_ERROR')
    expect(errors[1].propertyKey).toBe('prop2')
    expect(errors[1].code).toBe('IS_ERROR')
  })
})
describe('ObjectValidator > Nested objects', () => {
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

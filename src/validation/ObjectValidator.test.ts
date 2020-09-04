import { ValidationSchemaInterface } from '../schema/ValidationSchemaInterface'
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

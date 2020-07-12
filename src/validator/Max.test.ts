import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isGreater, Max } from './Max'

describe('isGreater', () => {
  test('true', () => {
    expect(isGreater(2, 1)).toBeTruthy()
    expect(isGreater(1.1, 1)).toBeTruthy()
  })
  test('false', () => {
    expect(isGreater(undefined, 1)).toBeFalsy()
    expect(isGreater(null, 1)).toBeFalsy()
    expect(isGreater(false, 1)).toBeFalsy()
    expect(isGreater(true, 1)).toBeFalsy()
    expect(isGreater('', 1)).toBeFalsy()
    expect(isGreater('2', 1)).toBeFalsy()
    expect(isGreater(new String('2'), 1)).toBeFalsy()
    expect(isGreater(1, 1)).toBeFalsy()
    expect(isGreater(0, 1)).toBeFalsy()
  })
})

describe('Max', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    Max(1)(0, context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    Max(1)(2, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('IS_GREATER')
    expect(error.message).toBe('prop1 is greater than 1')
  })
})

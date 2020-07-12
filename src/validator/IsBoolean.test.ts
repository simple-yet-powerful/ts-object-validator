import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isBoolean, IsBoolean } from './IsBoolean'

describe('isBoolean', () => {
  test('true', () => {
    expect(isBoolean(false)).toBeTruthy()
    expect(isBoolean(true)).toBeTruthy()
  })
  test('false', () => {
    expect(isBoolean(undefined)).toBeFalsy()
    expect(isBoolean(null)).toBeFalsy()
    expect(isBoolean(0)).toBeFalsy()
    expect(isBoolean('')).toBeFalsy()
    expect(isBoolean('0')).toBeFalsy()
    expect(isBoolean('false')).toBeFalsy()
    expect(isBoolean(new String())).toBeFalsy()
  })
})

describe('IsBoolean', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsBoolean()(false, context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsBoolean()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_BOOLEAN')
    expect(error.message).toBe('prop1 is not a boolean value')
  })
})

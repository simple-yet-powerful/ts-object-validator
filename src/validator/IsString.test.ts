import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isString, IsString } from './IsString'

describe('isString', () => {
  test('true', () => {
    expect(isString('')).toBeTruthy()
    expect(isString(new String())).toBeTruthy()
  })
  test('false', () => {
    expect(isString(undefined)).toBeFalsy()
    expect(isString(null)).toBeFalsy()
    expect(isString(false)).toBeFalsy()
    expect(isString(true)).toBeFalsy()
    expect(isString(0)).toBeFalsy()
    expect(isString(new Date())).toBeFalsy()
  })
})

describe('IsString', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsString()('', context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsString()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_STRING')
    expect(error.message).toBe('prop1 is not a string')
  })
})

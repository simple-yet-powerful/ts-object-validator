import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isNumber, IsNumber } from './IsNumber'

describe('isNumber', () => {
  test('true', () => {
    expect(isNumber(0)).toBeTruthy()
    expect(isNumber(0.1)).toBeTruthy()
  })
  test('false', () => {
    expect(isNumber(undefined)).toBeFalsy()
    expect(isNumber(null)).toBeFalsy()
    expect(isNumber(false)).toBeFalsy()
    expect(isNumber(true)).toBeFalsy()
    expect(isNumber('')).toBeFalsy()
    expect(isNumber('0')).toBeFalsy()
    expect(isNumber('1')).toBeFalsy()
    expect(isNumber(new String())).toBeFalsy()
  })
})

describe('IsNumber', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsNumber()(0, context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsNumber()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_NUMBER')
    expect(error.message).toBe('prop1 is not a number')
  })
})

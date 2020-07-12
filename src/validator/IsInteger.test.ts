import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isInteger, IsInteger } from './IsInteger'

describe('isInteger', () => {
  test('true', () => {
    expect(isInteger(0)).toBeTruthy()
  })
  test('false', () => {
    expect(isInteger(undefined)).toBeFalsy()
    expect(isInteger(null)).toBeFalsy()
    expect(isInteger(false)).toBeFalsy()
    expect(isInteger(true)).toBeFalsy()
    expect(isInteger(0.1)).toBeFalsy()
    expect(isInteger('')).toBeFalsy()
    expect(isInteger('0')).toBeFalsy()
    expect(isInteger('1')).toBeFalsy()
    expect(isInteger(new String())).toBeFalsy()
  })
})

describe('IsInteger', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsInteger()(0, context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsInteger()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_INTEGER')
    expect(error.message).toBe('prop1 is not an integer number')
  })
})

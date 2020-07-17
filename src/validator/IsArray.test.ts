import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isArray, IsArray } from './IsArray'

describe('isArray', () => {
  test('true', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray([1, 2])).toBeTruthy()
    expect(isArray(['1', '2'])).toBeTruthy()
    expect(isArray(new Array(0))).toBeTruthy()
  })
  test('false', () => {
    expect(isArray(undefined)).toBeFalsy()
    expect(isArray(null)).toBeFalsy()
    expect(isArray('')).toBeFalsy()
    expect(isArray(new String())).toBeFalsy()
  })
})

describe('IsArray', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsArray()([], context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsArray()('not an array', context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_ARRAY')
    expect(error.message).toBe('prop1 is not an array')
  })
})

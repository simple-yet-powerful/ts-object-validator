import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isUndefined, IsUndefined } from './IsUndefined'

describe('isUndefined', () => {
  test('true', () => {
    expect(isUndefined(undefined)).toBeTruthy()
  })
  test('false', () => {
    expect(isUndefined(null)).toBeFalsy()
    expect(isUndefined(false)).toBeFalsy()
    expect(isUndefined(0)).toBeFalsy()
    expect(isUndefined('')).toBeFalsy()
    expect(isUndefined(new String())).toBeFalsy()
  })
})

describe('IsUndefined', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsUndefined()(undefined, context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsUndefined()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_UNDEFINED')
    expect(error.message).toBe('prop1 is not undefined')
  })
})

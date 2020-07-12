import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isDefined, IsDefined } from './IsDefined'

describe('isDefined', () => {
  test('true', () => {
    expect(isDefined(false)).toBeTruthy()
    expect(isDefined(0)).toBeTruthy()
    expect(isDefined('')).toBeTruthy()
    expect(isDefined(new String())).toBeTruthy()
  })
  test('false', () => {
    expect(isDefined(undefined)).toBeFalsy()
    expect(isDefined(null)).toBeFalsy()
  })
})

describe('IsDefined', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsDefined()(true, context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsDefined()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('UNDEFINED')
    expect(error.message).toBe('prop1 is not defined')
  })
})

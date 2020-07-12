import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isLower, Min } from './Min'

describe('isLower', () => {
  test('true', () => {
    expect(isLower(0, 1)).toBeTruthy()
    expect(isLower(0.1, 1)).toBeTruthy()
  })
  test('false', () => {
    expect(isLower(undefined, 1)).toBeFalsy()
    expect(isLower(null, 1)).toBeFalsy()
    expect(isLower(false, 1)).toBeFalsy()
    expect(isLower(true, 1)).toBeFalsy()
    expect(isLower('', 1)).toBeFalsy()
    expect(isLower('0', 1)).toBeFalsy()
    expect(isLower(new String('0'), 1)).toBeFalsy()
    expect(isLower(1, 1)).toBeFalsy()
    expect(isLower(2, 1)).toBeFalsy()
  })
})

describe('Min', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    Min(1)(2, context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    Min(1)(0, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('IS_LOWER')
    expect(error.message).toBe('prop1 is lower than 1')
  })
})

import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { minLength, MinLength } from './MinLength'

describe('minLength', () => {
  test('true', () => {
    expect(minLength('short', 6)).toBeTruthy()
  })
  test('false', () => {
    expect(minLength(undefined, 6)).toBeFalsy()
    expect(minLength(null, 6)).toBeFalsy()
    expect(minLength(false, 6)).toBeFalsy()
    expect(minLength(true, 6)).toBeFalsy()
    expect(minLength('This is ok', 6)).toBeFalsy()
    expect(minLength(new String('This is ok'), 6)).toBeFalsy()
  })
})

describe('MinLength', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    MinLength(6)('This is ok', context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    MinLength(6)('short', context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('MIN_LENGTH')
    expect(error.message).toBe("prop1's length must be longer than or equal to 6")
  })
})

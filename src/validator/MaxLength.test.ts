import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { maxLength, MaxLength } from './MaxLength'

describe('maxLength', () => {
  test('true', () => {
    expect(maxLength('too long', 3)).toBeTruthy()
  })
  test('false', () => {
    expect(maxLength(undefined, 3)).toBeFalsy()
    expect(maxLength(null, 3)).toBeFalsy()
    expect(maxLength(false, 3)).toBeFalsy()
    expect(maxLength(true, 3)).toBeFalsy()
    expect(maxLength('', 3)).toBeFalsy()
    expect(maxLength('4', 3)).toBeFalsy()
    expect(maxLength(new String('4'), 3)).toBeFalsy()
  })
})

describe('MaxLength', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    MaxLength(3)('ok', context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    MaxLength(3)('too long', context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('MAX_LENGTH')
    expect(error.message).toBe("prop1's length must be shorter than or equal to 3")
  })
})

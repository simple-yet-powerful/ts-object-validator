import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isEmail, IsEmail } from './IsEmail'

describe('isEmail', () => {
  test('true', () => {
    expect(isEmail('john@doe.me')).toBeTruthy()
    expect(isEmail('john.doe@me.com')).toBeTruthy()
    expect(isEmail('john.doe+test@me.com')).toBeTruthy()
  })
  test('false', () => {
    expect(isEmail(undefined)).toBeFalsy()
    expect(isEmail(null)).toBeFalsy()
    expect(isEmail(true)).toBeFalsy()
    expect(isEmail(0)).toBeFalsy()
    expect(isEmail(new String())).toBeFalsy()
    expect(isEmail('john@doe.com john.doe@me.com')).toBeFalsy()
    expect(isEmail('john@')).toBeFalsy()
    expect(isEmail('@doe')).toBeFalsy()
    expect(isEmail('john@doe')).toBeFalsy()
    expect(isEmail('john@doe@me.com')).toBeFalsy()
  })
})

describe('IsEmail', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsEmail()('john.doe@me.com', context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsEmail()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_EMAIL')
    expect(error.message).toBe('prop1 is not a valid email address')
  })
})

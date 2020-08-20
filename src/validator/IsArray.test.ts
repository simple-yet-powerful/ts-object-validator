import { PropertyValidator, PropertyValidatorContext } from '../validation/PropertyValidator'
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
  test('Ok > with entryValidators', () => {
    const Ignore: PropertyValidator = (value, ctx, done): void => done()
    IsArray(Ignore)([1, 2], context, done)
    IsArray()([], context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError > NOT_ARRAY', () => {
    IsArray()('not an array', context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_ARRAY')
    expect(error.message).toBe('prop1 is not an array')
  })
  test('ValidationError > INVALID_ARRAY', () => {
    const IsError: PropertyValidator = (value, { propertyKey }, done): void => {
      done(new ValidationError(propertyKey, value, 'IS_ERROR', `${propertyKey} is invalid`))
    }
    IsArray(IsError)([1, 2], context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('INVALID_ARRAY')
    expect(error.message).toBe('prop1 is invalid')
    expect(error.children).toHaveLength(2)
    expect(error.children?.[0]).toBeInstanceOf(ValidationError)
    expect(error.children?.[0]?.propertyKey).toBe('prop1[0]')
    expect(error.children?.[0]?.code).toBe('IS_ERROR')
    expect(error.children?.[0]?.message).toBe('prop1[0] is invalid')
    expect(error.children?.[1]).toBeInstanceOf(ValidationError)
    expect(error.children?.[1]?.propertyKey).toBe('prop1[1]')
    expect(error.children?.[1]?.code).toBe('IS_ERROR')
    expect(error.children?.[1]?.message).toBe('prop1[1] is invalid')
  })
})

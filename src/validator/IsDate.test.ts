import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isDate, IsDate } from './IsDate'

describe('isDate', () => {
  test('true', () => {
    expect(isDate(new Date())).toBeTruthy()
  })
  test('false', () => {
    expect(isDate(null)).toBeFalsy()
    expect(isDate(undefined)).toBeFalsy()
    expect(isDate(true)).toBeFalsy()
    expect(isDate(42)).toBeFalsy()
    expect(isDate('2020-07-11T13:30:00Z')).toBeFalsy()
  })
})

describe('IsDate', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsDate()(new Date(), context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsDate()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_DATE')
    expect(error.message).toBe('prop1 is not a Date object')
  })
})

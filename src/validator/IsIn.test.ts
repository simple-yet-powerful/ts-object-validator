import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isIn, IsIn } from './IsIn'

describe('isIn', () => {
  const TestIn = [true, 'ONE', 1]

  test('true', () => {
    expect(isIn(TestIn, true)).toBeTruthy()
    expect(isIn(TestIn, 'ONE')).toBeTruthy()
    expect(isIn(TestIn, 1)).toBeTruthy()
  })
  test('false', () => {
    expect(isIn(TestIn, undefined)).toBeFalsy()
    expect(isIn(TestIn, null)).toBeFalsy()
    expect(isIn(TestIn, false)).toBeFalsy()
    expect(isIn(TestIn, new String('ONE'))).toBeFalsy()
    expect(isIn(TestIn, 'TWO')).toBeFalsy()
    expect(isIn(TestIn, new String('TWO'))).toBeFalsy()
  })
})

describe('IsIn', () => {
  const TestIn = [true, 'ONE', 1]
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  test('ValidationError', () => {
    IsIn(TestIn)('unknown', context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_IN')
    expect(error.message).toBe('prop1 must be must be one of the following values: true, ONE, 1')
  })
})

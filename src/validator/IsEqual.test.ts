import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isEqual, IsEqual } from './IsEqual'

describe('isEqual', () => {
  test('true', () => {
    expect(isEqual(undefined, undefined)).toBeTruthy()
    expect(isEqual(null, null)).toBeTruthy()
    expect(isEqual(false, false)).toBeTruthy()
    expect(isEqual(true, true)).toBeTruthy()
    expect(isEqual(0, 0)).toBeTruthy()
    expect(isEqual('', '')).toBeTruthy()
    expect(isEqual('test', 'test')).toBeTruthy()
    const ref = new String()
    expect(isEqual(ref, ref)).toBeTruthy()
  })
  test('false', () => {
    expect(isEqual(undefined, null)).toBeFalsy()
    expect(isEqual(false, 0)).toBeFalsy()
    expect(isEqual(0, '0')).toBeFalsy()
    expect(isEqual({}, {})).toBeFalsy()
    expect(isEqual(new String(), new String())).toBeFalsy()
  })
})

describe('IsEqual', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsEqual('reference')('reference', context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    IsEqual('reference')('not equal', context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_EQUAL')
    expect(error.message).toBe('prop1 is not equal to `reference`')
  })
})

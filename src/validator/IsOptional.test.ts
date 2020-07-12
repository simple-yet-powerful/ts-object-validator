import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { isOptional, IsOptional } from './IsOptional'

describe('isOptional', () => {
  test('true', () => {
    expect(isOptional(undefined)).toBeTruthy()
    expect(isOptional(null)).toBeTruthy()
  })
  test('false', () => {
    expect(isOptional(false)).toBeFalsy()
    expect(isOptional(0)).toBeFalsy()
    expect(isOptional('')).toBeFalsy()
    expect(isOptional('0')).toBeFalsy()
    expect(isOptional(new String())).toBeFalsy()
  })
})

describe('IsOptional', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsOptional()(null, context, done)
    expect(done).toBeCalledTimes(1)
  })
  test('Done() call', () => {
    IsOptional()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeUndefined()
  })
})

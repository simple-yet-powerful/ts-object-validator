import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { isEnum, IsEnum } from './IsEnum'

describe('isEnum', () => {
  enum TestEnum {
    ONE = 'ONE',
    TWO = 1,
  }
  test('true', () => {
    expect(isEnum(TestEnum, TestEnum.ONE)).toBeTruthy()
    expect(isEnum(TestEnum, 'ONE')).toBeTruthy()
    expect(isEnum(TestEnum, TestEnum.TWO)).toBeTruthy()
    expect(isEnum(TestEnum, 1)).toBeTruthy()
  })
  test('false', () => {
    expect(isEnum(TestEnum, undefined)).toBeFalsy()
    expect(isEnum(TestEnum, null)).toBeFalsy()
    expect(isEnum(TestEnum, false)).toBeFalsy()
    expect(isEnum(TestEnum, true)).toBeFalsy()
    expect(isEnum(TestEnum, 'john.doe@me')).toBeFalsy()
    expect(isEnum(TestEnum, new String('ONE'))).toBeFalsy()
  })
})

describe('IsEnum', () => {
  enum TestEnum {
    ONE = 'ONE',
    TWO = 'TWO',
  }
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  test('ValidationError', () => {
    IsEnum(TestEnum)('unknown', context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NOT_ENUM')
    expect(error.message).toBe('prop1 must be a valid enum value')
  })
})

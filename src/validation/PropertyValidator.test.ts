import { PropertyValidator, PropertyValidatorExecutor } from './PropertyValidator'
import { ValidationError } from './ValidationError'

function MockValidator(implementation?: PropertyValidator) {
  return jest.fn(implementation)
}

describe('PropertyValidation', () => {
  const propertyKey = 'prop1'
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Single validator', () => {
    const value = 10
    const validator = MockValidator()
    const error = PropertyValidatorExecutor.of(propertyKey, validator).validate(value)
    expect(error).toBeNull()
    expect(validator).toBeCalledTimes(1)
    expect(validator.mock.calls[0][0]).toBe(value)
    expect(validator.mock.calls[0][1].propertyKey).toBe(propertyKey)
  })
  test('Array of validators', () => {
    const value = 10
    const validator = MockValidator()
    const error = PropertyValidatorExecutor.of(propertyKey, [validator, validator]).validate(value)
    expect(error).toBeNull()
    expect(validator).toBeCalledTimes(2)
    expect(validator.mock.calls[0][0]).toBe(value)
    expect(validator.mock.calls[0][1].propertyKey).toBe(propertyKey)
    expect(validator.mock.calls[1][0]).toBe(value)
    expect(validator.mock.calls[1][1].propertyKey).toBe(propertyKey)
  })
  test('Change instance properties', () => {
    const value = 10
    const validator = MockValidator()
    const propertyValidator = new PropertyValidatorExecutor('before')
    propertyValidator.propertyKey = propertyKey
    propertyValidator.use(validator)
    const error = propertyValidator.validate(value)
    expect(error).toBeNull()
    expect(validator).toBeCalledTimes(1)
    expect(validator.mock.calls[0][0]).toBe(value)
    expect(validator.mock.calls[0][1].propertyKey).toBe(propertyKey)
  })
  test('Validator calls Done() > breaks chaining', () => {
    const value = 10
    const validator = MockValidator()
    const breakValidator = MockValidator((value, context, done) => done())
    const error = PropertyValidatorExecutor.of(propertyKey, [validator, breakValidator, validator]).validate(value)
    expect(error).toBeNull()
    expect(validator).toBeCalledTimes(1)
    expect(validator.mock.calls[0][0]).toBe(value)
    expect(validator.mock.calls[0][1].propertyKey).toBe(propertyKey)
    expect(breakValidator).toBeCalledTimes(1)
    expect(breakValidator.mock.calls[0][0]).toBe(value)
    expect(breakValidator.mock.calls[0][1].propertyKey).toBe(propertyKey)
  })
  test('Validator calls Done(ValidationError)', () => {
    const value = '10'
    const validator = MockValidator((value, context, done) =>
      done(new ValidationError(propertyKey, value, 'MY_CODE', 'My error'))
    )
    const error = PropertyValidatorExecutor.of(propertyKey, validator).validate(value) as ValidationError
    expect(error).toBeInstanceOf(ValidationError)
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('MY_CODE')
    expect(error.message).toBe('My error')
  })
  test('Validator throws ValidationError', () => {
    const value = '10'
    const validator = MockValidator((value) => {
      throw new ValidationError(propertyKey, value, 'MY_CODE', 'My error')
    })
    const error = PropertyValidatorExecutor.of(propertyKey, validator).validate(value) as ValidationError
    expect(error).toBeInstanceOf(ValidationError)
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('MY_CODE')
    expect(error.message).toBe('My error')
  })
  test('Throw Error', () => {
    const value = '10'
    const validator = MockValidator(() => {
      throw new Error('My error')
    })
    try {
      PropertyValidatorExecutor.of(propertyKey, validator).validate(value)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('My error')
    }
  })
  test('Pass options in validation context', () => {
    const value = null
    const group = 'TestGroup'
    const validator = MockValidator((value, context, done) => done())
    PropertyValidatorExecutor.of(propertyKey, validator).validate(value, { group })
    expect(validator).toBeCalledTimes(1)
    expect(validator.mock.calls[0][0]).toBe(value)
    expect(validator.mock.calls[0][1].propertyKey).toBe(propertyKey)
    expect(validator.mock.calls[0][1].group).toBe(group)
  })
})

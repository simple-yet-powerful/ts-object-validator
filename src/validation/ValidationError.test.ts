import { ValidatorErrorMessage, ValidatorOptions } from '../validator/Validator'
import { PropertyValidatorContext } from './PropertyValidator'
import { defaultErrorMessage, ValidationError } from './ValidationError'

describe('ValidationError', () => {
  const propertyKey = 'prop1'
  const value = 'value'
  const constraints = ['constraint1', 'constraint2']
  const code = 'CODE'
  const validatorContext: PropertyValidatorContext = { propertyKey }
  const messageContext = {
    propertyKey,
    value,
    constraints,
  }
  test('defaultErrorMessage()', () => {
    const message = defaultErrorMessage(messageContext)
    expect(message).toBe('prop1 is invalid')
  })
  test('of > minimal', () => {
    const error = ValidationError.of(code, value, validatorContext)
    expect(error.code).toBe(code)
    expect(error.value).toBe(value)
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.message).toBe(defaultErrorMessage(messageContext))
    expect(error.children).toBe(undefined)
  })
  test('of > complete + empty options', () => {
    const message: ValidatorErrorMessage = ({ propertyKey, value, constraints: [c1, c2] }) =>
      `${propertyKey} is equal to ${value} along with ${c1} and ${c2} constraints.`
    const options: ValidatorOptions = {}
    const child1 = ValidationError.of(code, 'val1', validatorContext)
    const child2 = ValidationError.of(code, 'val2', validatorContext)

    const error = ValidationError.of(code, value, validatorContext, message, options, constraints, [child1, child2])
    expect(error.code).toBe(code)
    expect(error.value).toBe(value)
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.message).toBe(message(messageContext))
    expect(error.children).toEqual([child1, child2])
  })
  test('of > complete + options.message', () => {
    const message: ValidatorErrorMessage = ({ propertyKey, value, constraints: [c1, c2] }) =>
      `${propertyKey} is equal to ${value} along with ${c1} and ${c2} constraints.`
    const messageOption: ValidatorErrorMessage = ({ propertyKey, value, constraints: [c1, c2] }) =>
      `${propertyKey} is equal to ${value} ; constraints: [${c1}, ${c2}]`
    const options: ValidatorOptions = { message: messageOption }
    const child1 = ValidationError.of(code, 'val1', validatorContext)
    const child2 = ValidationError.of(code, 'val2', validatorContext)

    const error = ValidationError.of(code, value, validatorContext, message, options, constraints, [child1, child2])
    expect(error.code).toBe(code)
    expect(error.value).toBe(value)
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.message).toBe(messageOption(messageContext))
    expect(error.children).toEqual([child1, child2])
  })
})

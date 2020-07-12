import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { Group } from './Group'

describe('Group', () => {
  const IsTest: PropertyValidator = jest.fn()
  const IsError: PropertyValidator = (value, { propertyKey }, done) =>
    done(new ValidationError(propertyKey, value, 'IS_ERROR', `${propertyKey} is invalid`))
  const done = jest.fn()
  const propertyKey = 'prop1'
  const group = 'TestGroup'
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Match group name', () => {
    Group(group, IsTest)(null, { propertyKey, group }, done)
    expect(IsTest).toBeCalledTimes(1)
  })
  test('Skip', () => {
    Group('anothergroup', IsTest)(null, { propertyKey, group }, done)
    expect(IsTest).toBeCalledTimes(0)
  })
  test('Call done on nested error', () => {
    Group(group, IsError)(null, { propertyKey, group }, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('IS_ERROR')
  })
})

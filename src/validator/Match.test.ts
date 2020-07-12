import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { ValidationError } from '../validation/ValidationError'
import { match, Match } from './Match'

describe('match', () => {
  const regexp = /my/i
  test('true', () => {
    expect(match('Check My Value', regexp)).toBeTruthy()
    expect(match(new String('Check My Value'), regexp)).toBeTruthy()
  })
  test('false', () => {
    expect(match(undefined, regexp)).toBeFalsy()
    expect(match(null, regexp)).toBeFalsy()
    expect(match(false, regexp)).toBeFalsy()
    expect(match(true, regexp)).toBeFalsy()
    expect(match(0, regexp)).toBeFalsy()
    expect(match(new String(), regexp)).toBeFalsy()
    expect(match(new Date(), regexp)).toBeFalsy()
  })
})

describe('Match', () => {
  const regexp = /my/i
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    Match(regexp)('Check My Value', context, done)
    expect(done).toBeCalledTimes(0)
  })
  test('ValidationError', () => {
    Match(regexp)(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeInstanceOf(ValidationError)
    const error = done.mock.calls[0][0] as ValidationError
    expect(error.propertyKey).toBe(propertyKey)
    expect(error.code).toBe('NO_MATCH')
    expect(error.message).toBe('prop1 does not match with the following pattern `/my/i`')
  })
})

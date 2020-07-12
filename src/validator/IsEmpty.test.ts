import { PropertyValidatorContext } from '../validation/PropertyValidator'
import { isEmpty, IsEmpty } from './IsEmpty'

describe('isEmpty', () => {
  test('true', () => {
    expect(isEmpty(undefined)).toBeTruthy()
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(new String())).toBeTruthy()
    expect(isEmpty(new String(''))).toBeTruthy()
  })
  test('false', () => {
    expect(isEmpty(false)).toBeFalsy()
    expect(isEmpty(0)).toBeFalsy()
    expect(isEmpty(' ')).toBeFalsy()
    expect(isEmpty('0')).toBeFalsy()
    expect(isEmpty(new String(' '))).toBeFalsy()
  })
})

describe('IsEmpty', () => {
  const propertyKey = 'prop1'
  const context: PropertyValidatorContext = { propertyKey }
  const done = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('Ok', () => {
    IsEmpty()('', context, done)
    expect(done).toBeCalledTimes(1)
  })
  test('Done() call', () => {
    IsEmpty()(null, context, done)
    expect(done).toBeCalledTimes(1)
    expect(done.mock.calls[0][0]).toBeUndefined()
  })
})

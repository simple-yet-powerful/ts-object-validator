import { Ignore } from './Ignore'

describe('Ignore', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  const propertyKey = 'prop1'
  const done = jest.fn()
  test('No condition', () => {
    Ignore()(null, { propertyKey }, done)
    expect(done).toBeCalledTimes(1)
  })
  test('Condition returns true', () => {
    Ignore((value, ctx) => value && ctx.propertyKey === propertyKey)(true, { propertyKey }, done)
    expect(done).toBeCalledTimes(1)
  })
  test('Condition return false', () => {
    Ignore((value) => Boolean(value))(false, { propertyKey }, done)
    expect(done).toBeCalledTimes(0)
  })
})

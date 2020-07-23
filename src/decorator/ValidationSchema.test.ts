import { ObjectValidator } from '../validation/ObjectValidator'
import { METADATA_KEY, ValidationSchema } from './ValidationSchema'

describe('Validate', () => {
  test('Build ObjectValidator no options', () => {
    @ValidationSchema()
    class TestClass {}
    const validator = Reflect.getMetadata(METADATA_KEY, TestClass) as ObjectValidator<TestClass>
    expect(validator).toBeInstanceOf(ObjectValidator)
    expect(validator.schema.allowMissingProperties).toBe(undefined)
    expect(validator.schema.allowUnknownProperties).toBe(undefined)
    expect(validator.schema.name).toBe(undefined)
    const sameValidator = ObjectValidator.of(TestClass)
    expect(sameValidator).toBe(validator)
  })
  test('Build ObjectValidator w/ options', () => {
    @ValidationSchema({ allowMissingProperties: true, allowUnknownProperties: true, name: 'Test Schema' })
    class TestClass {}
    const validator = Reflect.getMetadata(METADATA_KEY, TestClass) as ObjectValidator<TestClass>
    expect(validator).toBeInstanceOf(ObjectValidator)
    expect(validator.schema.allowMissingProperties).toBe(true)
    expect(validator.schema.allowUnknownProperties).toBe(true)
    expect(validator.schema.name).toBe('Test Schema')
  })
})

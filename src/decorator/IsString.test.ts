import { ObjectValidator } from '../validation/ObjectValidator'
import { PropertyValidator } from '../validation/PropertyValidator'
import { IsString } from './IsString'
import { METADATA_KEY, Validate } from './Validate'

describe('IsString', () => {
  test('Adds the correct PropertyValidator to the ObjectValidator', () => {
    @Validate()
    class TestClass {
      @IsString()
      prop1?: string
    }
    const validator = Reflect.getMetadata(METADATA_KEY, TestClass) as ObjectValidator<TestClass>
    const validators = validator.schema.properties.prop1 as PropertyValidator[]
    expect(validators).toBeDefined()
    expect(validators[0]).toBeInstanceOf(Function)
    expect(validators[0].name).toBe('IsString')
  })
})

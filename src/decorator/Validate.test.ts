import { ObjectValidator } from '../validation/ObjectValidator'
import { PropertyValidator } from '../validation/PropertyValidator'
import { IsEmail } from '../validator/IsEmail'
import { IsOptional } from '../validator/IsOptional'
import { Validate } from './Validate'
import { METADATA_KEY, ValidationSchema } from './ValidationSchema'

describe('Validate', () => {
  test('Build ObjectValidator w/ Single PropertyValidator', () => {
    @ValidationSchema()
    class TestClass {
      @Validate(IsEmail())
      prop1?: string
    }
    const validator = Reflect.getMetadata(METADATA_KEY, TestClass) as ObjectValidator<TestClass>
    const validators = validator.schema.properties.prop1 as PropertyValidator[]
    expect(validators).toBeDefined()
    expect(validators[0]).toBeInstanceOf(Function)
    expect(validators[0].name).toBe('IsEmail')
  })
  test('Build ObjectValidator w/ Array of PropertyValidator', () => {
    @ValidationSchema()
    class TestClass {
      @Validate([IsOptional(), IsEmail()])
      prop1?: string
    }
    const validator = Reflect.getMetadata(METADATA_KEY, TestClass) as ObjectValidator<TestClass>
    const validators = validator.schema.properties.prop1 as PropertyValidator[]
    expect(validators).toBeDefined()
    expect(validators[0]).toBeInstanceOf(Function)
    expect(validators[0].name).toBe('IsOptional')
    expect(validators[1]).toBeInstanceOf(Function)
    expect(validators[1].name).toBe('IsEmail')
  })
})

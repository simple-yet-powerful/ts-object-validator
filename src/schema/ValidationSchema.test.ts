import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationSchema } from './ValidationSchema'

describe('ValidationSchema', () => {
  const TestValidator: PropertyValidator = (value, ctx, done) => done
  test('From plain object', () => {
    const schema: ValidationSchema = {
      name: 'Name',
      allowMissingProperties: true,
      allowUnknownProperties: true,
      properties: {
        prop1: TestValidator,
        prop2: {
          allowMissingProperties: true,
          allowUnknownProperties: true,
          properties: {
            nested1: TestValidator,
          },
        },
      },
    }
    expect(schema).toBeTruthy()
  })
})

import { PropertyValidator } from '../validation/PropertyValidator'
import { ValidationSchemaInterface } from './ValidationSchemaInterface'

describe('ValidationSchemaInterface', () => {
  const TestValidator: PropertyValidator = (value, ctx, done) => done
  test('From plain object', () => {
    const schema: ValidationSchemaInterface = {
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
  test('From class', () => {
    class NestedTestClass {
      constructor(public nestedProp1: string, public nestedProp2: string, public nestedProp3: string) {}
    }
    class TestClass {
      constructor(
        public prop1: string,
        public prop2: number,
        public prop3: boolean,
        public prop4: string[],
        public prop5: NestedTestClass,
        public method1: () => ''
      ) {}
      public method2() {
        ''
      }
    }
    const schema: ValidationSchemaInterface<TestClass> = {
      name: 'Name',
      allowMissingProperties: true,
      allowUnknownProperties: true,
      properties: {
        prop1: TestValidator,
        prop2: TestValidator,
        prop3: TestValidator,
        prop4: TestValidator,
        prop5: {
          allowMissingProperties: true,
          allowUnknownProperties: true,
          properties: {
            nestedProp1: TestValidator,
            nestedProp2: TestValidator,
            nestedProp3: TestValidator,
          },
        },
        method1: TestValidator,
        method2: TestValidator,
      },
    }
    expect(schema).toBeTruthy()
  })
})

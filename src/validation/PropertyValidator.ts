import { ValidationError, ValidatorErrorMessage } from './ValidationError'

export type PropertyValidatorOptions = { message?: ValidatorErrorMessage; group?: string }
export type PropertyValidatorContext = { propertyKey: string } & PropertyValidatorOptions
export type Done = (error?: ValidationError) => void
export type PropertyValidator = (value: unknown, context: PropertyValidatorContext, done: Done) => void

export class PropertyValidatorExecutor {
  private isDone = false

  constructor(public propertyKey: string, public validators: PropertyValidator[] = []) {}

  private done(err?: ValidationError) {
    if (err) {
      throw err
    } else {
      this.isDone = true
    }
  }

  public use(validator: PropertyValidator): this {
    this.validators.push(validator)
    return this
  }

  public validate(value: unknown, options?: PropertyValidatorOptions): ValidationError | null {
    this.isDone = false
    const done = this.done.bind(this)
    const { propertyKey } = this
    const context = { propertyKey, ...options }
    for (const validator of this.validators) {
      try {
        validator(value, context, done)
      } catch (err) {
        if (err instanceof ValidationError) {
          return err
        }
        throw err
      }
      if (this.isDone) {
        break
      }
    }
    return null
  }

  static of(propertyKey: string, validators: PropertyValidator | PropertyValidator[]): PropertyValidatorExecutor {
    return new this(propertyKey, Array.isArray(validators) ? validators : [validators])
  }
}

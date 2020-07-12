import { isDefined } from './IsDefined'
import { PropertyValidator, PropertyValidatorExecutor } from '../validation/PropertyValidator'

/**
 * Runs the group of `validators` when the `group` option matches with the `name` of this `Group`.
 */
export function Group(name: string, validators: PropertyValidator | PropertyValidator[]): PropertyValidator {
  return (value, context, done) => {
    const { propertyKey, group } = context
    if (isDefined(group) && group === name) {
      const error = PropertyValidatorExecutor.of(propertyKey, validators).validate(value, context)
      if (error) {
        done(error)
      }
    }
  }
}

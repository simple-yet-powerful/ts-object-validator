import { PropertyValidator, PropertyValidatorContext } from '../validation/PropertyValidator'

/**
 * Ignore (skip) other validations if there is no `condition` specified or if the result of `condition()` is true.
 * @param condition `(value: unknown, context: PropertyValidatorContext) => boolean`
 */
export function Ignore(condition?: (value: unknown, context: PropertyValidatorContext) => boolean): PropertyValidator {
  return function Ignore(value, context, done) {
    ;(!condition || condition(value, context)) && done()
  }
}

# @sypp/object-validator

A simple yet powerful schema-based object validation package.

## Features

- Class instance or plain object validation against validation schema
- Nested object validation
- Recursive error reporting
- Strict by default
- Decorator support

## Installation

```shell
npm install @sypp/object-validator
```

```shell
yarn add @sypp/object-validator
```

## Usage

```typescript
export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export class User {
  public id: string
  public email: string
  public firstName: string
  public lastName: string
  public roles: UserRole[]
}

export const UserSchema: ValidationSchema<User> = {
  allowMissingProperties: true,
  properties: {
    id: IsUndefined(),
    email: IsEmail(),
    firstName: [IsString(), MinLength(2)],
    lastName: [IsOptional(), IsString(), MinLength(2)],
    roles: IsArray(IsEnum(UserRole)),
  },
}

const body = {
  email: 'john.doe@me.com',
  firstName: 'John',
  roles: ['BAD_ROLE'],
}

const errors = ObjectValidator.of(UserSchema).validate(body)
if (errors.length > 0) {
  console.debug(errors)
}
```

## Validation schema

```typescript
const MyValidationSchema: ValidationSchema<MyClass> = {
  allowUnknownProperties: true,
  allowMissingProperties: true,
  properties: {
    /* … */
  },
}
```

| Property                 | Type    | Default    | Description                                                        |
| ------------------------ | ------- | ---------- | ------------------------------------------------------------------ |
| `allowUnknownProperties` | boolean | `false`    | Avoid unknown properties error report from the object to validate. |
| `allowMissingProperties` | boolean | `false`    | Avoid missing properties error report from the object to validate. |
| `properties`             | boolean | _required_ | Avoid missing validator error from the validation schema.          |

### Working with nested objects

In order to validate a nested object, the schema must have a nested schema in the related property definition:

```typescript
class UserProfile {
  public bio: string
  public company: string
  public location: string
  public website: string
}

class User {
  public id: string
  public email: string
  public firstName: string
  public lastName: string
  public roles: UserRole[]
  public profile: UserProfile // => a nested object to validate
}

const UserSchema: ValidationSchema<User> = {
  properties: {
    /* … */
    profile: {
      // This is actually a nested validation schema
      allowMissingProperties: true,
      properties: {
        bio: IsString(),
        company: IsString(),
        location: IsString(),
        website: IsString(),
      },
    },
  },
}
```

### Optional nested objects

```typescript
const UserSchema: ValidationSchema<User> = {
  properties: {
    /* … */
    profile: [
      IsOptional(),
      Nested<UserProfile>({
        properties: {
          bio: IsString(),
          company: IsString(),
          location: IsString(),
          website: IsString(),
        },
      }),
    ],
  },
}
```

## Available validators

The order of the validators matter. Ex: `IsOptional()` should be before any type validator like `IsString()`, otherwise `IsOptional()` will have no effect.

```typescript
const MyValidationSchema: ValidationSchema<MyClass> = {
  properties: {
    prop1: [IsOptional(), IsString(), MinLength(2) /* … */],
    // …
  },
}
```

| Validator                                   | Description                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `Group(name: string, validators: [])`       | Group validators that will apply only when you call `ObjectValidator.validate(…)` with the `group` option.        |
| `Ignore()`                                  | Just skip the property validation. Useless for plain object validation.                                           |
| `IsArray(validators?: [], options?: {})`    | Checks if the value is an `Array` object. You can also validate the inner values with the `validators` parameter. |
| `IsBoolean(options?: {})`                   | Checks if the value is a `boolean`.                                                                               |
| `IsDate(options?: {})`                      | Checks if the value is a `Date` object.                                                                           |
| `IsDefined(options?: {})`                   | Checks if the value is a not `undefined` or `null`.                                                               |
| `IsEmail(options?: {})`                     | Checks if the value is a valid email address.                                                                     |
| `IsEmpty()`                                 | Do not report error if the value is `undefined`, `null` or `''`.                                                  |
| `IsEnum(entity: enum, options?: {})`        | Checks if the value is a valid enum.                                                                              |
| `IsEqual(reference: unknown, options?: {})` | Checks if the value is `===` to `reference`.                                                                      |
| `IsInteger(options?: {})`                   | Checks if the value is an `integer` `number`.                                                                     |
| `IsNumber(options?: {})`                    | Checks if the value is a `number`.                                                                                |
| `IsOptional()`                              | Do not report error if the value is `undefined` or `null`.                                                        |
| `IsString(options?: {})`                    | Checks if the value is a `string`.                                                                                |
| `IsUndefined(options?: {})`                 | Checks if the value is `undefined`.                                                                               |
| `Match(pattern: RegExp, options?: {})`      | Checks if the value matches with the RegExp `pattern`.                                                            |
| `Max(max: number, options?: {})`            | Checks if the value is lower or equal to `max`.                                                                   |
| `MaxLength(max: number, options?: {})`      | Checks if the length of the string value is less or equel to `max`.                                               |
| `Min(min: number, options?: {})`            | Checks if the value is greater or equal to `min`.                                                                 |
| `MinLength(min: number, options?: {})`      | Checks if the length of the string value is greater or equal to `min`.                                            |
| `Nested<T>(schema: ValidationSchema)`       | Checks the value for nested validation schema.                                                                    |

Any validator with `options` accepts an `options.message` function to let you customize the error message:

```typescript
const myCustomMessage = ({
  propertyKey: string,
  value: unknown,
  constraints: unknown[]
}) => `${propertyKey} is greater than ${constraints[0]}`
```

## Object validation with `ObjectValidator`

```typescript
import UserSchema from './UserSchema'

const body = {
  email: 'john.doe@me.com',
  firstName: 'John',
  roles: ['MEMBER'],
}

ObjectValidator.of(UserSchema).validate(body)

// With options
ObjectValidator.of(UserSchema).validate(body, {
  group,
})
```

| Option | Description                                                    |
| ------ | -------------------------------------------------------------- |
| group  | Let you select the `Group(<group>, […validators])` to execute. |

## Decorators

### The `@ValidationSchema` class decorator

This decorator let you build the validation schema of a class and define the schema options (see [Validation Schema Options](#Validation-Schema-Options)).

```typescript
@ValidationSchema({
  allowMissingProperties: true,
})
class User {
  /* … */
}
```

### The `@Validate` property decorator

This decorator let you define the validators to use to validate the value of the property (see [Available validators](#Available-validators)).

```typescript
@ValidationSchema()
class User {
  @Validate(IsString())
  public id: string

  @Validate(IsEmail())
  public email: string

  @Validate(IsString())
  public firstName: string

  @Validate(IsString())
  public lastName: string

  /* … */
}
```

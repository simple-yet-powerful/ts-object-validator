# @sypp/object-validator

A simple yet powerful schema-based object validation package.

## Basics

- Class instances or plain objects validation against a schema
- Strict type safety
- Errors are reported in an array of errors with nested errors.

## Install

```shell
yarn add @sypp/object-validator
```

## Usage _– work best with TypeScript_

_Note: `export` keywords and other real things are omitted for code clarity._

```typescript
import {
  Group,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUndefined,
  Match,
  MinLength,
  ObjectValidator,
  ValidationSchema,
} from 'object-validator'

/**
 * Définitions
 */

enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

class User {
  public id: string
  public email: string
  public firstName: string
  public lastName: string
  public roles: UserRole[]
}

// Autocompletion of options and `properties` should occurs in your IDE thanks to TypeScript generics: <User>
const UserSchema: ValidationSchema<User> = {
  properties: {
    id: [
      Group('create', IsUndefined()),
      Group('update', [Match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)]),
    ],
    email: IsEmail(),
    firstName: [IsString(), MinLength(2)],
    lastName: [IsOptional(), IsString()],
    roles: IsArray(IsEnum(UserRole)),
  },
}

/**
 * Validation
 */

// Plain object or class instance work the same. Plain object here:
const body = {
  email: 'john.doe@me.com',
  firstName: 'John',
  roles: ['BAD_ROLE'],
}

const errors = ObjectValidator.of(UserSchema).validate(body, { group: 'create' })
if (errors.length > 0) {
  console.debug(errors)
}
```

Works with full plain objects as well:

```javascript
// Equivalent to enum
const UserRole = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
}

// No autocompletion for `properties` since there is no class definition
const UserSchema = {
  properties: {
    id: [
      Group('create', IsUndefined()),
      Group('update', [Match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)]),
    ],
    email: IsEmail(),
    firstName: [IsString(), MinLength(2)],
    lastName: [IsOptional(), IsString()],
    roles: IsArray(IsEnum(UserRole)),
  },
}

/**
 * Validation
 */
const body = {
  email: 'john.doe@me.com',
  firstName: 'John',
  roles: ['BAD_ROLE'],
}

const errors = ObjectValidator.of(UserSchema).validate(body, { group: 'create' })
if (errors.length > 0) {
  console.debug(errors)
}
```

## Work with nested objects

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
    /* … regular property validations */
    profile: {
      allowMissingProperties: true,
      properties: {
        // Autocompletion occurs here as well
        bio: IsString(),
        company: IsString(),
        location: IsString(),
        website: IsString(),
      },
    },
  },
}
```

### Optional nested object

```typescript
const UserSchema: ValidationSchema<User> = {
  properties: {
    /* … regular property validations */
    profile: [
      IsOptional(),
      Nested<UserProfile>({
        properties: {
          // Autocompletion and type safety
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

| Validator                                   | Description                                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `Group(name: string, validators: [])`       | Group validators that will apply only when you call `ObjectValidator.validate(…)` with the `group` option. |
| `Ignore()`                                  | Just skip the property validation. Useless for plain object validation.                                    |
| `IsArray(validators?: [], options?: {})`    | Checks if the value is an `Array` object.                                                                  |
| `IsBoolean(options?: {})`                   | Checks if the value is a `boolean`.                                                                        |
| `IsDate(options?: {})`                      | Checks if the value is a `Date` object.                                                                    |
| `IsDefined(options?: {})`                   | Checks if the value is a not `undefined` or `null`.                                                        |
| `IsEmail(options?: {})`                     | Checks if the value is a valid email address.                                                              |
| `IsEmpty()`                                 | Do not report error if the value is `undefined`, `null` or `''`.                                           |
| `IsEnum(entity: enum, options?: {})`        | Checks if the value is a valid enum.                                                                       |
| `IsEqual(reference: unknown, options?: {})` | Checks if the value is `===` to `reference`.                                                               |
| `IsInteger(options?: {})`                   | Checks if the value is an `integer` `number`.                                                              |
| `IsNumber(options?: {})`                    | Checks if the value is a `number`.                                                                         |
| `IsOptional()`                              | Do not report error if the value is `undefined` or `null`.                                                 |
| `IsString(options?: {})`                    | Checks if the value is a `string`.                                                                         |
| `IsUndefined(options?: {})`                 | Checks if the value is `undefined`.                                                                        |
| `Match(pattern: RegExp, options?: {})`      | Checks if the value matches with the RegExp `pattern`.                                                     |
| `Max(max: number, options?: {})`            | Checks if the value is lower or equal to `max`.                                                            |
| `MaxLength(max: number, options?: {})`      | Checks if the length of the string value is less or equel to `max`.                                        |
| `Min(min: number, options?: {})`            | Checks if the value is greater or equal to `min`.                                                          |
| `MinLength(min: number, options?: {})`      | Checks if the length of the string value is greater or equal to `min`.                                     |
| `Nested<T>(schema: ValidationSchema)`       | Checks the value for nested validation schema.                                                             |

Any validator with `options` accepts an `options.message` function to let you customize the error message:

```typescript
const myCustomMessage = ({ propertyKey: string, value: unknown, constraints: unknown[] }) => `${propertyKey} is greater than ${constraints[0]}`
```

## What next

- @decorator support
- Easy inline custom validator support
- More validators out of the box(?!)
- Documentation to let you build your own Validators

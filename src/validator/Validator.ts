export type ValidatorOptions = { message?: ValidatorErrorMessage }
export type ValidatorErrorMessage = (context: { propertyKey: string; value: unknown; constraints: unknown[] }) => string

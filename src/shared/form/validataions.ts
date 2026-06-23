import * as v from 'valibot'

export const emailValidator = v.pipe(v.string(), v.email('Invalid email'))

export const passwordValidator = v.pipe(
  v.string(),
  v.minLength(8, 'Password must be at least 8 characters long'),
)

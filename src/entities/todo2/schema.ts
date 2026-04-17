import { object, string } from 'valibot'

export const UserSchema = object({
  _id: string(),
  name: string(),
  email: string(),
})

import {
  createFormHook,
  createFormHookContexts,
} from '@tanstack/react-form'

import InputField from './Input-field'

const {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
} = createFormHookContexts()

export { useFieldContext, useFormContext }

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    InputField,
  },

  formComponents: {},
})
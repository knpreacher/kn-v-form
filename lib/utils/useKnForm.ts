import type { KnFormData, KnFormStringField } from "../types.ts";

function useKnForm(
  fields: KnFormData['fields'],
  options?: Omit<KnFormData, 'fields'>
): KnFormData {
  return {
    ...options,
    fields,
  }
}

function useKnStringField(
  key: string,
  options?: Omit<KnFormStringField, 'name' | 'type'>
): KnFormStringField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'string',
  } as KnFormStringField
}

export const kn = {
  form: useKnForm,
  string: useKnStringField
}

import type { KnFormData, KnFormFloatField, KnFormIntField, KnFormStringField } from '../types.ts'

function useKnForm(
  groups: KnFormData['groups'],
  options?: Omit<KnFormData, 'fields'>
): KnFormData {
  return {
    ...options,
    groups
  }
}

type FieldOptions<T> = Omit<T, 'name' | 'type'>

function useKnStringField(
  key: string,
  options?: FieldOptions<KnFormStringField>
): KnFormStringField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'string'
  } as KnFormStringField
}

function useKnIntField(
  key: string,
  options?: FieldOptions<KnFormIntField>
): KnFormIntField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'int'
  } as KnFormIntField
}

function useKnFloatField(
  key: string,
  options?: FieldOptions<KnFormFloatField>
): KnFormFloatField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'float'
  } as KnFormFloatField
}

export const kn = {
  form: useKnForm,
  string: useKnStringField,
  int: useKnIntField,
  float: useKnFloatField
}

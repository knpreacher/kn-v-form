import type {
  DefaultSelectionOption, KnFormComputedField, KnFormCustomField,
  KnFormData,
  KnFormFloatField,
  KnFormIntField, KnFormSelectField, KnFormSelectManyField,
  KnFormStringField
} from '../types.ts'

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

function useKnComputedField<AllData = any>(
  key: string,
  valueGetter: (allData: AllData) => any,
  options?: FieldOptions<Omit<KnFormComputedField, 'valueGetter'>>
): KnFormComputedField {
  return {
    ...(options ?? {}),
    valueGetter,
    name: key,
    type: 'computed'
  } as KnFormComputedField
}

function useKnCustomField(
  key: string,
  component: any,
  options?: FieldOptions<Omit<KnFormCustomField, 'component'>>
): KnFormCustomField {
  return {
    ...(options ?? {}),
    component,
    name: key,
    type: 'custom'
  } as KnFormCustomField
}

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

function useKnSelectField<ItemOption extends DefaultSelectionOption = DefaultSelectionOption>(
  key: string,
  items: ItemOption[],
  options?: FieldOptions<Omit<KnFormSelectField<ItemOption>, 'options'>>
): KnFormSelectField {
  return {
    ...(options ?? {}),
    options: items,
    name: key,
    type: 'select'
  } as KnFormSelectField
}

function useKnSelectManyField<ItemOption extends DefaultSelectionOption = DefaultSelectionOption>(
  key: string,
  items: ItemOption[],
  options?: FieldOptions<Omit<KnFormSelectManyField<ItemOption>, 'options'>>
): KnFormSelectManyField {
  return {
    ...(options ?? {}),
    options: items,
    name: key,
    type: 'select_many'
  } as KnFormSelectManyField
}

export const kn = {
  form: useKnForm,

  computed: useKnComputedField,
  custom: useKnCustomField,
  string: useKnStringField,
  int: useKnIntField,
  float: useKnFloatField,
  select: useKnSelectField,
  selectMany: useKnSelectManyField
}

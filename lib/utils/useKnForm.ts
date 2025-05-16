import type {
  DefaultSelectionOption, KnFormAnyField, KnFormComputedField, KnFormCustomField,
  KnFormData, KnFormFieldGroupData,
  KnFormFloatField, KnFormGroup,
  KnFormIntField, KnFormPasswordField, KnFormSelectField, KnFormSelectManyField,
  KnFormStringField
} from '@/types'

function form(
  groups: KnFormData['groups'],
  options?: Omit<KnFormData, 'groups'>
): KnFormData {
  return {
    ...options,
    groups
  }
}

function group(
  fields: KnFormAnyField[],
  options?: KnFormGroup
): KnFormFieldGroupData {
  return {
    ...options,
    fields
  }
}

type FieldOptions<T> = Omit<T, 'name' | 'type'>

function computed<AllData = any>(
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

function custom(
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

function string(
  key: string,
  options?: FieldOptions<KnFormStringField>
): KnFormStringField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'string'
  } as KnFormStringField
}

function password(
  key: string,
  options?: FieldOptions<KnFormPasswordField>
): KnFormPasswordField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'password'
  } as KnFormPasswordField
}

function int(
  key: string,
  options?: FieldOptions<KnFormIntField>
): KnFormIntField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'int'
  } as KnFormIntField
}

function float(
  key: string,
  options?: FieldOptions<KnFormFloatField>
): KnFormFloatField {
  return {
    ...(options ?? {}),
    name: key,
    type: 'float'
  } as KnFormFloatField
}

function select<ItemOption extends DefaultSelectionOption = DefaultSelectionOption>(
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

function selectMany<ItemOption extends DefaultSelectionOption = DefaultSelectionOption>(
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

export {
  form,
  group,

  computed,
  custom,
  string,
  password,
  int,
  float,
  select,
  selectMany
}

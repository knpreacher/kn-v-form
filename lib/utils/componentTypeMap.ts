import type { FieldDataType } from '@/types'
import * as fields from '@/components/fields'
export const componentMap = Object.freeze<Partial<Record<FieldDataType, any>>>({
  computed: fields.KnComputedInputField,
  custom: fields.KnCustomInputField,
  bool_toggle: fields.KnBoolToggleInputField,
  boolean: fields.KnBoolToggleInputField,
  grid_select: fields.KnGridSelectInputField,
  string: fields.KnStringInputField,
  password: fields.KnPasswordInputField,
  int: fields.KnIntInputField,
  float: fields.KnFloatInputField,
  select: fields.KnSelectInputField,
  toggle_select: fields.KnToggleSelectInputField,
  select_many: fields.KnSelectManyInputField,
  api_object_select: fields.KnApiObjectSelectInputField,
  api_object_select_many: fields.KnApiObjectSelectManyInputField
})
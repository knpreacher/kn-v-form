import type { FieldDataType } from '@/types'
import * as fields from '@/components/fields'
export const componentMap = Object.freeze<Partial<Record<FieldDataType, any>>>({
  computed: fields.KnComputedInputField,
  custom: fields.KnCustomInputField,
  string: fields.KnStringInputField,
  password: fields.KnPasswordInputField,
  int: fields.KnIntInputField,
  float: fields.KnFloatInputField,
  select: fields.KnSelectInputField,
  select_many: fields.KnSelectManyInputField
})
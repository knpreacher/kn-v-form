import type { Reactive } from 'vue'
import { computed } from 'vue'
import type { KnFormAnyField } from '@/types.ts'
import { defineFieldSlots } from '@/utils/slotUtils.ts'

export interface UseKnFormFieldOptions<
  ValueType, PropsType extends KnFormAnyField
> {
  model: Reactive<ValueType>,
  fieldProps: PropsType,
}

// type SlotKeys<Props>

export function useKnFormField<
  ValueType,
  PropsType extends KnFormAnyField,
>(
  model: Reactive<ValueType>,
  fieldProps: PropsType,
  slotNames: (keyof Required<Required<PropsType>['slots']>)[]
) {
// >({model, fieldProps}: UseKnFormFieldOptions<ValueType, PropsType>) {
  const label = computed(() => fieldProps.label)
  const inputSlotNames = defineFieldSlots(slotNames)
  // @ts-ignore
  const inputSlots = inputSlotNames.map(name => [name, fieldProps.slots?.[name]]).filter(s=>!!s[1])

  return {
    model,
    fieldData: fieldProps,
    inputProps: fieldProps?.inputProps,
    inputSlots,
    label
  }
}
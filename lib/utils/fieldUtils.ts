import type { Reactive, Ref } from 'vue'
import { computed } from 'vue'
import type { KnFormAnyField } from '@/types'
import { defineFieldSlots } from '@/utils/slotUtils'

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
  model: Ref<ValueType>,
  fieldProps: PropsType,
  slotNames: (keyof Required<Required<PropsType>['slots']>)[]
) {
// >({model, fieldProps}: UseKnFormFieldOptions<ValueType, PropsType>) {
  const label = computed(() => fieldProps.outLabel ? undefined : fieldProps.label)
  const inputSlotNames = defineFieldSlots(slotNames)
  // @ts-ignore
  const inputSlots = inputSlotNames.map(name => [ name, fieldProps.slots?.[name] ]).filter(s => !!s[1])

  return {
    model,
    fieldData: fieldProps,
    inputProps: {
      ...fieldProps?.inputProps,
      rules: fieldProps.rules
    },
    inputSlots,
    label
  }
}
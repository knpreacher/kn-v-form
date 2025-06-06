import type { Reactive, Ref } from 'vue'
import { computed, isRef } from 'vue'
import type { DefaultSelectionOption, KnFormAnyField } from '@/types'
import { defineFieldSlots } from '@/utils/slotUtils'
import { InputOptions } from '@/types'

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
  const inputSlots = inputSlotNames.map(name => [ name, fieldProps.slots?.[name] ]).filter(s => !!s[1]) as [keyof typeof slotNames, any][]

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

export function useSelectionOptions<Options = DefaultSelectionOption, Field extends InputOptions = InputOptions>(
  fieldProps: Field
) {
  const options = computed<Options[]>(
    () => {
      const _o = fieldProps.options
      if (!_o && !(_o as Ref).value) {
        return [] as Options[]
      }
      if (Array.isArray(_o)) {
        return fieldProps.options as Options[]
      }
      if (isRef(_o) && Array.isArray(_o.value)) {
        return _o.value as Options[]
      }
      return [] as Options[]
    }
  )
  return {
    options
  }
}
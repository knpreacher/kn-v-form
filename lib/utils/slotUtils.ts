// import type { VTextField } from 'vuetify/components'
import type { DefaultSlotNames, HeaderSlotNames } from '@/types.ts'

// type VuetifySlots = VTextField['$slots']

const headerSlots:HeaderSlotNames[] = [
  'header', 'header_label', 'header_before_label', 'header_after_label', 'header_side'
]

const defaultSlots: DefaultSlotNames[] = [
  ...headerSlots,
  'default', 'append', 'prepend'
]

export function defineFieldSlots<ExtraSlots = string>(slots: ExtraSlots[]) {
  return [
    ...defaultSlots,
    ...slots
  ]
}
import type { VTextField, VNumberInput, VIcon } from 'vuetify/components'

export type FieldDataType =
  | 'string'
  | 'int'
  | 'float'
  | 'date'
  | 'time'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'checkbox'
  | 'radio'

type AbstractInputProps = Record<string, any>

export type VueClassData = Record<string, any> | string | undefined

export type SizeValue = string | number | boolean
export type GridSizeName = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type GridSize = Partial<Record<GridSizeName, SizeValue> & { fit: boolean }>

export interface KnFormComputedStringFunctionOptions {
  value: any,
  // emitValue: (value: any) => void,
  allData: any,
  // emitAllData: (data: any) => void
}

export type KnFormComputedStringFunction = (options: KnFormComputedStringFunctionOptions) => {
  content?: string,
  html?: true
}

export interface KnFieldSlotData {
  text?: string
  icon?: VIcon['$props'] | string
  html?: string
  component?: any
  componentProps?: any
  cls?: VueClassData
  computedString?: KnFormComputedStringFunction
}

export interface KnFieldSlotDataObject {
  text?: string
  icon?: VIcon['$props']
  html?: string
  component?: any
  componentProps?: any
  cls?: VueClassData
}

export type HeaderSlotNames = 'header' | 'header_label' | 'header_before_label' | 'header_after_label' | 'header_side'
export type DefaultSlotNames = HeaderSlotNames | 'default' | 'prepend' | 'append'

export interface KnFormAbstractField<
  InputProps extends AbstractInputProps = AbstractInputProps,
  SlotNames extends string = DefaultSlotNames
> {
  label?: string,
  gridSize?: GridSize
  name: string
  type: FieldDataType
  required?: boolean

  inputProps?: InputProps,
  slots?: Partial<Record<SlotNames, KnFieldSlotData>>
}

type VuetifyAbstractInputProps = AbstractInputProps & {
  label?: string
  modelValue?: any
}

type PreparedInputProps<T extends VuetifyAbstractInputProps> = Partial<Omit<T, 'modelValue' | 'label'>>

// type FieldSlots<T extends string> = DefaultSlotNames | T
type GetSlots<T extends { $slots: Record<string, any> }> = keyof T['$slots'] | DefaultSlotNames

export interface KnFormStringField extends KnFormAbstractField<
  PreparedInputProps<VTextField>,
  GetSlots<VTextField>
> {
}

export interface KnFormIntField extends KnFormAbstractField<
  PreparedInputProps<VNumberInput>,
  GetSlots<VNumberInput>
> {
}

export interface KnFormFloatField extends KnFormAbstractField<
  PreparedInputProps<VNumberInput>,
  GetSlots<VNumberInput>
> {
}

export type KnFormAnyField =
  KnFormStringField
  | KnFormIntField
  | KnFormFloatField


export interface KnFormGroup {
  label?: string
  expandable?: boolean
  defaultOpen?: boolean
  gridSize?: GridSize
}

export interface KnFormFieldGroup extends KnFormGroup {
  fields: KnFormAnyField[]
}

export interface KnFormData {
  groups: KnFormFieldGroup[]
}
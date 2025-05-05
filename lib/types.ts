import type { VTextField, VNumberInput, VIcon, VSwitch, VRow, VSelect, VInput } from 'vuetify/components'

export type FieldDataType =
  | 'computed'
  | 'custom'
  | 'string'
  | 'int'
  | 'float'
  | 'date'
  | 'time'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'select_many'
  | 'checkbox'
  | 'radio'

type AbstractInputProps = Record<string, any>

export type VueClassData = Record<string, any> | string | undefined

export type SizeValue = string | number | boolean
export type GridSizeName = 'cols' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type GridSizeObject = Partial<Record<GridSizeName, SizeValue>>
export type GridSize = GridSizeObject & { fit?: boolean }

export declare type FieldShowConditionFunction<T extends Record<string, any> = Record<string, any>> = (allData: T) => boolean

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
  name: string
  type: FieldDataType

  outLabel?: boolean,
  inlineOutLabel?: VueClassData | boolean
  wrapToggle?: true | Omit<VSwitch['$props'], 'modelValue'>
  untoggledValue?: any

  gridSize?: GridSize
  // required?: boolean

  inputProps?: InputProps,
  slots?: Partial<Record<SlotNames, KnFieldSlotData>>,

  showIf?: FieldShowConditionFunction,
}

type VuetifyAbstractInputProps = AbstractInputProps & {
  label?: string
  modelValue?: any
}

type PreparedInputProps<T extends VuetifyAbstractInputProps> = Partial<Omit<T, 'modelValue' | 'label'>>

export interface DefaultSelectionOption<T = any> {
  value: T
  label?: string
  leftIcon?: VIcon['$props']
  rightIcon?: VIcon['$props']
  cls?: VueClassData
  disabled?: boolean

  [key: string]: any
}

// type FieldSlots<T extends string> = DefaultSlotNames | T
type GetSlots<T extends { $slots: Record<string, any> }> = keyof T['$slots'] | DefaultSlotNames
//
// Computed Field
//
export interface KnFormComputedField extends KnFormAbstractField<
  PreparedInputProps<Omit<VTextField, 'readonly'>>,
  GetSlots<VTextField>
> {
  valueGetter: <T = any>(allData: T) => any,
  emitToModel?: boolean
}

//
// Custom Field
//
export interface KnFormCustomField extends KnFormAbstractField<
  PreparedInputProps<VInput>,
  GetSlots<VInput>
> {
  component: any,
  componentProps?: any,
  wrapVInput?: boolean,
  innerSlots?: Record<string, KnFieldSlotData>
}

//
// String Field
//
export interface KnFormStringField extends KnFormAbstractField<
  PreparedInputProps<VTextField>,
  GetSlots<VTextField>
> {
}

//
// Int Field
//

export interface KnFormIntField extends KnFormAbstractField<
  PreparedInputProps<VNumberInput>,
  GetSlots<VNumberInput>
> {
}

//
// Float Field
//

export interface KnFormFloatField extends KnFormAbstractField<
  PreparedInputProps<VNumberInput>,
  GetSlots<VNumberInput>
> {
}

//
// Select Field
//

export interface KnFormSelectField<
  Options extends DefaultSelectionOption = DefaultSelectionOption
> extends KnFormAbstractField<
  PreparedInputProps<Omit<VSelect['$props'], 'items' | 'multiple' | 'options'>>,
  GetSlots<VSelect>
> {
  options: Options[]
}

//
// Select many Field
//

export interface KnFormSelectManyField<
  Options extends DefaultSelectionOption = DefaultSelectionOption
> extends KnFormAbstractField<
  PreparedInputProps<Omit<VSelect['$props'], 'items' | 'multiple' | 'options'>>,
  GetSlots<VSelect>
> {
  options: Options[]
}

export type KnFormAnyField =
  KnFormComputedField
  | KnFormCustomField
  | KnFormStringField
  | KnFormIntField
  | KnFormFloatField
  | KnFormSelectField
  | KnFormSelectManyField


export interface KnFormGroup {
  label?: string
  expandable?: boolean
  defaultOpen?: boolean
  gridSize?: GridSize,
  rowOptions?: Omit<VRow['$props'], '$children'>
  fieldDefaults?: Partial<Omit<KnFormAbstractField, 'type' | 'name'>>
  showIf?: FieldShowConditionFunction
}

export interface KnFormFieldGroupData extends KnFormGroup {
  fields: KnFormAnyField[]
}

export interface KnFormData {
  groups: KnFormFieldGroupData[],
  groupDefaults?: Partial<KnFormGroup>
}
import type {
  VTextField,
  VNumberInput,
  VIcon,
  VSwitch,
  VRow,
  VSelect,
  VInput,
  VDialog,
  VBtn,
  VForm, VBtnToggle, VBtnGroup, VCard
} from 'vuetify/components'
import type { ValidationRule } from 'vuetify/framework'

export type FieldDataType =
  | 'computed'
  | 'custom'
  | 'bool_toggle'
  | 'grid_select'
  | 'string'
  | 'password'
  | 'int'
  | 'float'
  | 'date'
  | 'time'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'toggle_select'
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

export type ValidationRules = ValidationRule[]

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
export type DefaultSlotNames = HeaderSlotNames | 'default' | 'prepend' | 'append' | 'footer'

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

  rules?: ValidationRules

  inputProps?: InputProps,
  slots?: Partial<Record<SlotNames, KnFieldSlotData | string>>,

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
// Bool toggle Field
//
export interface KnFormBoolToggleField extends KnFormAbstractField<
  PreparedInputProps<VInput>,
  GetSlots<VInput>
> {
  btnGroupProps?: VBtnGroup['$props'],
  emptyAsFalse?: boolean,
  positiveBtn?: string | VBtn['$props'],
  negativeBtn?: string | VBtn['$props']
}

//
// Bool toggle Field
//
export interface KnFormGridSelectField<
  Options extends DefaultSelectionOption = DefaultSelectionOption
> extends KnFormAbstractField<
  PreparedInputProps<VInput>,
  GetSlots<VInput>
> {
  options: Options[],
  selectedCls?: string,
  cardProps?: VCard['$props']
  inputGridSize?: GridSize
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
// Password Field
//
export interface KnFormPasswordField extends KnFormAbstractField<
  PreparedInputProps<VTextField>,
  GetSlots<VTextField>
> {
  passwordHideIcon?: string,
  passwordShowIcon?: string
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
// Toggle select Field
//

export interface KnFormToggleSelectField<
  Options extends DefaultSelectionOption = DefaultSelectionOption
> extends KnFormAbstractField<
  PreparedInputProps<VInput>,
  GetSlots<VInput>
> {
  options: Options[],
  clearable?: boolean
  clearValue?: any
  clearIcon?: VIcon['$props']
  btnProps?: VBtn,
  btnGroupProps?: Omit<VBtnToggle['$props'], 'multiple'>,
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
  | KnFormBoolToggleField
  | KnFormGridSelectField
  | KnFormStringField
  | KnFormIntField
  | KnFormFloatField
  | KnFormSelectField
  | KnFormToggleSelectField
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
  groupDefaults?: Partial<KnFormGroup>,
  formProps?: VForm['$props']

  disableHiddenSubmit?: boolean
}

// Dialog
export type DialogResolveFn<Result = any> = (result?: Result) => void

export interface KnCommonDialogData {
  title?: string
  dialogProps?: Partial<VDialog['$props']>,
  resolve: DialogResolveFn
}

export interface KnCustomDialogData extends KnCommonDialogData {
  component: any,
  componentProps?: Record<string, any>
}

export interface KnSelectDialogData extends KnCommonDialogData {
  options: DefaultSelectionOption[]
}
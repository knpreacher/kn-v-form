import type { VTextField } from "vuetify/components";

export type FieldDataType =
  | 'string'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'checkbox'
  | 'radio'

type AbstractInputProps = Record<string, any>

export interface KnFormAbstractField<
  InputProps extends AbstractInputProps = AbstractInputProps
> {
  label?: string
  name: string
  type: FieldDataType
  required?: boolean

  inputProps?: InputProps
}

type VuetifyAbstractInputProps = AbstractInputProps & {
  label?: string
  modelValue?: any
}

type PreparedInputProps<T extends VuetifyAbstractInputProps> = Omit<T, 'modelValue' | 'label'>

export interface KnFormStringField extends KnFormAbstractField<
  PreparedInputProps<VTextField>
> {
}

export type KnFormAnyField = KnFormStringField

export interface KnFormData {
  fields: KnFormAnyField[]
}
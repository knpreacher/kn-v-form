import { KnFormLayout, KnFormFieldWrapper, fields } from './components'
import SlotRenderer from './components/helpers/SlotRenderer.vue'
import * as kn from './utils/useKnForm'

import * as jsUtils from './utils/jsUtils'

export * from './types'
import './index.css'
import { dialogPlugin, useKnDialog } from '@/dialogPlugin'
import { rulesPlugin, useKnValidationRules, createRules } from '@/validation/rulesPlugin'

export {
  KnFormLayout,
  KnFormFieldWrapper,
  SlotRenderer,
  fields,
  kn,
  jsUtils,

  rulesPlugin,
  createRules,
  useKnValidationRules,

  dialogPlugin,
  useKnDialog,
}
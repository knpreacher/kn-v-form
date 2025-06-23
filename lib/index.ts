import { KnFormLayout, KnFormFieldWrapper, fields } from './components'
import SlotRenderer from './components/helpers/SlotRenderer.vue'
import Pass from './components/helpers/Pass.vue'
import * as kn from './utils/useKnForm'

import * as jsUtils from './utils/jsUtils'

import * as apiProvider from './web/apiProvider'

export * from './types'
import './index.css'
import { dialogPlugin, useKnDialog, useKnCustomDialog } from '@/dialogPlugin'
import { rulesPlugin, useKnValidationRules, createRules } from '@/validation/rulesPlugin'

export {
  KnFormLayout,
  KnFormFieldWrapper,
  SlotRenderer,
  Pass,
  fields,
  kn,
  jsUtils,
  apiProvider,

  rulesPlugin,
  createRules,
  useKnValidationRules,

  dialogPlugin,
  useKnDialog,
  useKnCustomDialog
}
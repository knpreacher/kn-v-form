import { KnFormLayout, fields } from './components'
import SlotRenderer from './components/helpers/SlotRenderer.vue'
import * as kn from './utils/useKnForm'

import * as jsUtils from './utils/jsUtils'

export * from './types'
import './index.css'
import { dialogPlugin, useKnDialog } from '@/dialogPlugin'
import { rulesPlugin, useKnValidationRules, createRules } from '@/validation/rulesPlugin'

const {form, int, custom, string, float, group, select, selectMany, password, computed} = kn
export {
  KnFormLayout,
  SlotRenderer,
  fields,
  kn,
  jsUtils,

  rulesPlugin,
  createRules,
  useKnValidationRules,

  dialogPlugin,
  useKnDialog,

  form,
  group,

  int,
  custom,
  string,
  float,
  select,
  selectMany,
  password,
  computed
}
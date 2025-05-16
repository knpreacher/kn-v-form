import { KnFormLayout, fields } from './components'
import SlotRenderer from './components/helpers/SlotRenderer.vue'
import * as kn from './utils/useKnForm.ts'

import * as jsUtils from './utils/jsUtils'

export * from './types'
import './index.css'

const {form, int, custom, string, float, group, select, selectMany, password, computed} = kn

export {
  KnFormLayout,
  SlotRenderer,
  fields,
  kn,
  jsUtils,

  form,
  int,
  custom,
  string,
  float,
  group,
  select,
  selectMany,
  password,
  computed
}
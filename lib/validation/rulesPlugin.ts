import { inject, Plugin } from 'vue'
import { fakeTranslate, RULES, RulesOptions } from '@/validation/rules.ts'

const rulesInjectKey = 'knValidationRules'

export const rulesPlugin: Plugin<RulesOptions> = {
  install(app, options) {
    if (!options) {
      options = {
        $t: app.config.globalProperties.$t ?? app.config.globalProperties.t ?? fakeTranslate
      }
    }
    const rules = RULES(options)
    app.config.globalProperties.$knValidationRules = rules
    app.provide(rulesInjectKey, rules)
  }
}

export function useKnValidationRules() {
  const rules = inject<ReturnType<typeof RULES> | undefined>(rulesInjectKey)
  if (!rules) {
    throw new Error('knValidationRules is not provided')
  }
  return rules
}
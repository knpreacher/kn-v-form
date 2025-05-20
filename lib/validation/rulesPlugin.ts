import { inject, Plugin } from 'vue'
import { fakeTranslate, RULES, RulesOptions } from '@/validation/rules.ts'

const rulesInjectKey = 'knValidationRules'

/**
 * Creates a set of validation rules based on the provided options. Use outside a Vue component.
 */

export function createRules(options?: RulesOptions) {
  return RULES(options)
}

export const rulesPlugin: Plugin<RulesOptions> = {
  install(app, options) {
    if (!options) {
      options = {
        $t: app.config.globalProperties.$t ?? app.config.globalProperties.t ?? fakeTranslate
      }
    }
    const rules = createRules(options)
    app.config.globalProperties.$knValidationRules = rules
    app.provide(rulesInjectKey, rules)
  }
}
/**
 * Creates a set of validation rules based on the provided options. Use inside a Vue component.
 */
export function useKnValidationRules() {
  const rules = inject<ReturnType<typeof RULES> | undefined>(rulesInjectKey)
  if (!rules) {
    throw new Error('knValidationRules is not provided')
  }
  return rules
}
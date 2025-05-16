<script setup lang="ts">
import { VBtn, VTextField } from 'vuetify/components'

import type { KnFormPasswordField } from '@/types.ts'
import { useKnFormField } from '@/utils/fieldUtils.ts'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { computed, ref } from 'vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormPasswordField
}>()
const _model = defineModel<string>()
const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    [ 'prepend-inner' ]
)
const isPasswordHidden = ref(true)
const inputType = computed(() =>
    isPasswordHidden.value ? 'password' : 'text'
)

const inputTypeSwitchProps = computed<Partial<VBtn['$props']>>(() => (isPasswordHidden.value ? {
  icon: fieldProps.passwordShowIcon,
  text: fieldProps.passwordShowIcon ? undefined : '🔒'
} : {
  icon: fieldProps.passwordHideIcon,
  text: fieldProps.passwordHideIcon ? undefined : '🔓'
}))

function onTypeSwitchClick() {
  isPasswordHidden.value = !isPasswordHidden.value
}

</script>

<template>
  <v-text-field v-model="model" v-bind="inputProps as any" :label="label" :type="inputType">
    <template
        v-for="[slotName, s] in inputSlots"
        :key="slotName" #[slotName]
    >
      <slot-renderer
          :slot-data="s"
          v-model="model"
      />
    </template>
    <template #append-inner>
      <v-btn
          elevation="0" density="compact"
          rounded="circle" variant="text"
          v-bind="inputTypeSwitchProps"
          @click.prevent.stop="onTypeSwitchClick"
      />
    </template>
  </v-text-field>
</template>

<style scoped>

</style>
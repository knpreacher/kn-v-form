<script setup lang="ts" generic="Pos = any, Neg = any, Neutral = any">
import { VDialog, VCard, VCardText, VCardActions, VBtn, VSpacer } from 'vuetify/components'
import type { KnSubmitDialogData } from '@/types.ts'
import { nextTick, ref, watch } from 'vue'

const props = defineProps<KnSubmitDialogData<Pos, Neg, Neutral>>()

const isOpen = ref(true)

watch(isOpen, (value) => {
  if (!value) {
    nextTick(() => {
      props.resolve(props.neutralValue)
    })
  }
})

function bindButton(_props: string | VBtn['$props']) {
  if (typeof _props === 'string') {
    return {
      text: _props
    }
  }
  return _props
}

</script>

<template>
  <v-dialog v-bind="dialogProps" v-model="isOpen">
    <v-card :title="title">
      <v-card-text>
        <slot>
          <div v-if="body" v-html="body"></div>
        </slot>
      </v-card-text>
      <v-card-actions class="d-flex align-center">
        <slot name="actions">
          <v-btn v-if="neutralBtn" v-bind="bindButton(neutralBtn)" @click="isOpen = false"></v-btn>
          <v-spacer />
          <v-btn text="No" v-bind="bindButton(negativeBtn ?? {})" @click="resolve(negativeValue ?? false)"></v-btn>
          <v-btn text="Yes" v-bind="bindButton(positiveBtn ?? {})" @click="resolve(positiveValue ?? true)"></v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { VDialog, VCard, VList, VListItem, VIcon } from 'vuetify/components'
import type { KnSelectDialogData } from '@/types.ts'
import { nextTick, ref, watch } from 'vue'

const props = defineProps<KnSelectDialogData>()

const isOpen = ref(true)

watch(isOpen, (value) => {
  if (!value) {
    nextTick(() => {
      props.resolve()
    })
  }
})

function onItemClick(item: KnSelectDialogData['options'][number]) {
  props.resolve(item.value)
  isOpen.value = false
}
</script>

<template>
  <v-dialog v-bind="dialogProps" v-model="isOpen">
    <v-card :title="title">
      <v-list>
        <v-list-item
            v-for="item in options" :key="`item__${item.value}`"
            :title="item.label" :value="item.value"
            @click="onItemClick(item)"
            :disabled="item.disabled"
        >
          <template #prepend>
            <v-icon v-if="item.leftIcon" v-bind="item.leftIcon"></v-icon>
          </template>
          <template #append>
            <v-icon v-if="item.rightIcon" v-bind="item.rightIcon"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
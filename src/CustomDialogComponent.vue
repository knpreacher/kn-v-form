<script setup lang="ts">
import { VDialog, VCard, VCardText, VBtn } from 'vuetify/components'
import { type KnCustomDialogProps, useKnCustomDialog } from './../lib'


const props = defineProps<KnCustomDialogProps>()

const {dialogProps, resolve} = useKnCustomDialog(props)
</script>

<template>
  <v-dialog v-bind="dialogProps">
    <v-card>
      <v-card-text>
        <div>Kek</div>
        <v-btn @click="resolve({data: 'dialog resolved !!!'})"></v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { VTextField } from "vuetify/components";

import type { KnFormStringField } from "@/types.ts";

defineProps<{
  fieldProps: KnFormStringField
}>()
const model = defineModel<string>()
</script>

<template>
  <v-text-field v-model="model" v-bind="fieldProps"></v-text-field>
</template>

<style scoped>

</style>
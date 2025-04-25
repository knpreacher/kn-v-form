<script setup lang="ts">

import { VForm } from "vuetify/components";

import type { KnFormData } from "@/types.ts";
import KnFormFieldWrapper from "@/components/KnFormFieldWrapper.vue";

defineProps<{
  schema: KnFormData
}>()

const model = defineModel<Record<string, any>>({required: true})
</script>

<template>
  <v-form>
    <kn-form-field-wrapper
        v-for="field in schema.fields"
        :key="`field__${field.name}`"
        v-model="model[field.name]"
        :field-props="field"
    />
  </v-form>
</template>

<style scoped>

</style>
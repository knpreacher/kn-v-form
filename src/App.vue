<script setup lang="ts">

import KnFormLayout from "@/components/KnFormLayout.vue";
import { kn } from "@/utils/useKnForm.ts";
import { ref } from "vue";
import { VCode, VDivider } from "vuetify/components";


const form = kn.form([
  kn.string('name', {})
])

const model = ref({})
</script>

<template>
  <div>
    <h1>Kn V Form Lib</h1>
    <v-divider />
    <v-code v-text="model"></v-code>
    <v-divider />
    <kn-form-layout :schema="form" v-model="model"/>
  </div>
</template>


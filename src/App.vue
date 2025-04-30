<script setup lang="ts">

import { KnFormLayout, kn } from './../lib'
import { computed, ref } from 'vue'
import { VCode, VDivider, VApp, VContainer } from 'vuetify/components'


const form = kn.form([
  {
    label: 'PERSON',
    fields: [
      kn.string('name', {
        label: 'NAME',
        inputProps: {},
        slots: {
          'append-inner': {
            text: 'kg'
          },
          header: {
            text: 'HEADER'
          }
        }
      }),
      kn.int('age', {
        label: 'AGE'
      }),
      kn.float('weight', {
        label: 'WEIGHT'
      }),
      kn.float('weight2', {
        label: 'WEIGHT2'
      })
    ]
  }
])

const model = ref({})
const displayModel = computed(() => JSON.stringify(model.value, null, 2))
</script>

<template>
  <v-app>
    <v-container>
      <h1>Kn V Form Lib</h1>
      <v-divider/>
      <h3>Model</h3>
      <v-code>
        <pre v-text="displayModel"></pre>
      </v-code>
      <v-divider/>
      <h3>Form</h3>
      <kn-form-layout :schema="form" v-model="model"/>
    </v-container>
  </v-app>
</template>


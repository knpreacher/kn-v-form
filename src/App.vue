<script setup lang="ts">

import { KnFormLayout, kn } from './../lib'
import { computed, ref } from 'vue'
import TestCustomInput from './TestCustomInput.vue'

const form = kn.form([
  {
    label: 'PERSON',
    gridSize: {
      cols: 12,
      sm: 12,
      md: 6,
      lg: 4
    },
    rowOptions: {
      align: 'end'
    },
    fieldDefaults: {
      outLabel: true,
      inputProps: {
        hideDetails: 'auto'
      }
    },
    // expandable: true,
    fields: [
      kn.string('name', {
        label: 'NAME',
        inputProps: {},
        slots: {
          'append-inner': {
            text: 'kg'
          },
          header_side: {
            text: 'kg',
            cls: 'text-red'
          }
        }
      }),
      kn.custom('age_custom', TestCustomInput, {
        label: 'Slider age',
        componentProps: {
          sliderProps: {
            min: 0,
            max: 100,
            step: 1
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
        label: 'WEIGHT2',
        showIf(data) {
          return data?.age > 18 || false
        }
      }),
      kn.select('select', [
        {
          value: 4,
          label: '4o'
        },
        {
          value: 5,
          label: '5o',
          disabled: true
        }
      ], {
        label: 'SELECT'
      }),
      kn.selectMany('selectMany', [
        {
          value: 4,
          label: '4o'
        },
        {
          value: 5,
          label: '5o'
        },
        {
          value: 6,
          label: '6o'
        }
      ], {
        label: 'SELECT MANY'
      }),
      kn.computed('computed',
          (allData) => allData?.age + 10,
          {
            emitToModel: true
          }
      ),
      kn.password('password', {
        label: 'pass',
        passwordHideIcon: 'lock'
      })
    ]
  }
])

const model = ref({
  age: 10
})
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


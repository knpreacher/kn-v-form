<script setup lang="ts">

import { KnFormLayout, KnFormFieldWrapper, kn, useKnDialog, useKnValidationRules, apiProvider } from './../lib'
import { computed, ref } from 'vue'
import TestCustomInput from './TestCustomInput.vue'
import CustomDialogComponent from './CustomDialogComponent.vue'
import { VApp, VContainer, VDivider, VCode, VBtn } from 'vuetify/components'


const rules = useKnValidationRules()

const testApiProvider = new apiProvider.BaseApiProvider({
  list: async (query) => {
    let response = await fetch(`http://localhost:3000/items?sleep=200&${new URLSearchParams(query).toString()}`, {
      method: 'GET'
    })
    return await response.json()
  },
  retrieveObject: async (id) => {
    let response = await fetch(`http://localhost:3000/item/${id}`, {
      method: 'GET'
    })
    const respData = await response.json()
    console.log('retrieveObject', respData)
    return respData
  },
  getItemsFromListResponse: (response) => {
    return response.items
  },
  getLimitFromListResponse: (response) => {
    return response.limit
  },
  getOffsetFromListResponse: (response) => {
    return response.offset
  },
  getTotalFromListResponse: (response) => {
    return response.count
  },
  itemAsOption: (item) => {
    return {
      value: item.id,
      label: `[${item.id}] - ${item.name} / ${item.age}`
    }
  }
})

const computedOptions = computed(() => {
  return Array(10).fill(0).map((_, index) => {
    return {
      value: index,
      label: `${index}o`,
      disabled: index < model.value.age
    }
  })
})

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
        rules: [
          rules.required()
        ],
        slots: {
          footer: 'footer kg',
          'append-inner': 'kg',
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
      kn.boolToggle('bool_toggle', {
        text: 'Yes'
      }, {text: 'No'}),
      kn.toggleSelect('toggle_select', [
        {
          value: 4,
          label: '4o'
        },
        {
          value: 5,
          label: '5o',
          disabled: true
        },
        {
          value: 6,
          label: '6o'
        }
      ], {
        inlineOutLabel: true,
        clearable: true,
        rules: [
          rules.required()
        ],
        label: 'SELECT TOGGLE',
        inputProps: {},
        btnProps: {
          // color: 'primary',
          activeColor: 'green'
        }
      }),
      kn.gridSelect('grid_select', computedOptions, {
        label: 'grid_SELECT',
        selectedCls: 'bg-primary text-white',
        inputGridSize: {
          cols: 3
        }
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
      }),
      kn.apiObjectSelect(
          'api_object_select',
          testApiProvider, {
            autoFetch: (data: any) => {
              return typeof data === 'string' || typeof data === 'number'
            }
          }
      )
    ]
  }
], {
  formProps: {
    validateOn: 'submit'
  }
})

const model = ref({
  age: 10,
  api_object_select: 101
})
const displayModel = computed(() => JSON.stringify(model.value, null, 2))

const {select, custom: customDialog} = useKnDialog()

function onOpenSelectDialogBtnClick() {
  select({
    title: 'Select Dialog',
    options: [
      {
        value: 1,
        label: '1o'
      },
      {
        value: 2,
        label: '2o'
      },
      {
        value: 3,
        label: '3o'
      }
    ]
  }).then((value) => {
    console.log('resolved', value)
  })
}

function onOpenCustomDialogBtnClick() {
  customDialog({
    title: 'Custom Dialog',
    component: CustomDialogComponent
  }).then((data) => {
    console.log('resolved', data)
  })
}
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
      <kn-form-layout :schema="form" v-model="model">
        <template #actions>
          <v-btn type="submit">Submit 123</v-btn>
        </template>
      </kn-form-layout>
      <v-divider/>
      <h3>Single field</h3>
      <!--      <kn-form-field-wrapper />-->
      <v-divider/>
      <h3>Dialog</h3>
      <v-btn @click="onOpenSelectDialogBtnClick">Open Select Dialog</v-btn>
      <v-btn @click="onOpenCustomDialogBtnClick">Open Custom Dialog</v-btn>
    </v-container>
  </v-app>
</template>


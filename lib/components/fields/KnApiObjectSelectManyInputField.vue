<script setup lang="ts" generic="T = any">
import { VTextField, VMenu, VInfiniteScroll, VCard, VListItem, VCheckbox, VChip } from 'vuetify/components'

import type { KnFormApiObjectSelectManyField } from '@/types'
import { computed, onMounted, ref, UnwrapRef, watch } from 'vue'
import { useKnFormField } from '@/utils/fieldUtils.ts'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { debounceRef } from '@/utils/vueUtils.ts'
import { randString } from '@/utils/jsUtils.ts'
import Pass from '@/components/helpers/Pass.vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormApiObjectSelectManyField
}>()

const _isObjectsEqual = (a: any, b: any) => a === b

const isObjectsEqual = fieldProps.checkEqual ?? _isObjectsEqual

interface InfiniteScrollLoadOptions {
  side: 'end' | 'start' | 'both'
  done: (status: 'error' | 'loading' | 'empty' | 'ok') => void
}

const _model = defineModel<T[]>()

const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    [ 'append-inner', 'prepend-inner' ]
)

const selectedItems = ref<T[]>([])

const selectedOptions = computed(() => {
  return selectedItems.value.map(item => itemAsOption(item as T))
})

function setSelected(item?: T) {
  if (!item) return
  if (isItemSelected(item)) {
    selectedItems.value.splice(selectedItems.value.findIndex(i => isObjectsEqual(i, item)), 1)
    return
  }
  selectedItems.value?.push(item as any)
}

function removeSelectedItem(ind: number) {
  selectedItems.value.splice(ind, 1)
}

function isItemSelected(item: T) {
  return selectedItems.value?.some(i => isObjectsEqual(i, item))
}

watch(selectedItems, value => {
  if (!value) {
    model.value = undefined
  } else {
    model.value = fieldProps.returnObject ? selectedItems.value : selectedItems.value?.map(item => getItemValue(item as T))
  }
}, {deep: true})

// function getItemLabel(item: T) {
//   const opt = itemAsOption(item)
//   return opt.label ?? String(opt.value)
// }

function getItemValue(item: T | UnwrapRef<T>) {
  const opt = itemAsOption(item as T)
  return opt.value
}

const menuVisible = ref(false)

function needAutoFetch() {
  return !!model.value && (fieldProps.autoFetch?.(model.value) ?? false)
}

const modelFetchLoading = ref(needAutoFetch())

const items = ref<T[]>([])

const isEmpty = computed(() => !items.value.length)

const filterText = ref('')
const debouncedFilterText = debounceRef(filterText, 500, {
  emitEmptyImmediate: true
})

const infScrollKey = ref(randString())

watch(debouncedFilterText, (v) => {
  items.value = []
  menuVisible.value = true
  if (!v) {
    infScrollKey.value = randString()
  }
  // if (needFilter.value) {
  //   if (!menuVisible.value) {
  //     menuVisible.value = true
  //   }
  //   infScrollKey.value = randString()
  // } else {
  //   menuVisible.value = false
  //   needFilter.value = true
  // }
})

function onLoadMore(options: InfiniteScrollLoadOptions) {
  fieldProps.apiProvider.preparedList({
    limit: 25,
    offset: items.value.length ?? 0,
    search: debouncedFilterText.value
  }).then((res) => {
    if (!res.items.length) {
      options.done('empty')
      return
    }
    items.value.push(...res.items)
    options.done('ok')
  })
}


function onInputBlur() {

  // needFilter.value = false
  // if (selectedItem.value) {
  //   if (!filterText.value) {
  //     selectedItem.value = null
  //   } else {
  //     filterText.value = getItemLabel(selectedItem.value)
  //   }
  // } else {
  //   filterText.value = ''
  // }
}

function itemAsOption(item: T) {
  return fieldProps.apiProvider.itemAsOption(item)
}

onMounted(() => {
  if (!needAutoFetch()) return
  console.log('onMounted', model.value)
  modelFetchLoading.value = true
  if (!model.value?.length) return
  Promise.all(
      model.value.map(modelItem => fieldProps.apiProvider.retrieveObject(modelItem))
  ).then(res => {
    res.forEach(setSelected)
  }).finally(() => {
    modelFetchLoading.value = false
  })
})

</script>

<template>
  <div class="kn-api-object-select-many" :class="{'has-selected': selectedItems.length}">
    <div class="kn-api-object-select-many__selected-items">
      <v-chip v-for="(item, ind) in selectedOptions" :key="item.value"
              :prepend-icon="item.leftIcon?.icon"
              :append-icon="item.rightIcon?.icon"
              :text="item.label" closable
              @click:close="removeSelectedItem(ind)"
      >

      </v-chip>
    </div>
    <v-menu
        :close-on-content-click="false" v-model="menuVisible"
        contained
    >
      <template v-slot:activator="{ props }">
        <v-text-field
            autocomplete="off"
            :loading="modelFetchLoading"
            :readonly="modelFetchLoading"
            @blur="onInputBlur"
            v-bind="{...props, ...inputProps} as any" :label="label"
            v-model="filterText"
        >
          <template
              v-for="[slotName, s] in inputSlots"
              :key="slotName" #[slotName]
          >
            <slot-renderer
                :slot-data="s"
                v-model="model"
            />
          </template>
        </v-text-field>
      </template>
      <v-card>
        <v-infinite-scroll
            :key="infScrollKey"
            ref="infScrollRef" max-height="250"
            min-height="64" @load="onLoadMore"
        >
          <template v-for="item in items" :key="item.value">
            <pass
                :bind-props="{selected: isItemSelected(item as T), option: itemAsOption(item as T)}"
                #default="{option, selected}"
            >
              <div>
                <v-list-item
                    :active="selected"
                    :value="option.value"
                    :title="option.label"
                    :prepend-icon="option.leftIcon?.icon"
                    :append-icon="option.rightIcon?.icon"
                    @click="setSelected(item as T)"
                >
                  <template #prepend>
                    <v-checkbox :model-value="selected" hide-details density="compact" style="margin-right: 8px;"/>
                  </template>
                </v-list-item>
              </div>
            </pass>
          </template>
          <template #empty>
            <div v-if="isEmpty" v-text="fieldProps.emptyText"></div>
          </template>
        </v-infinite-scroll>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
</style>
<script setup lang="ts" generic="T = any">
import { VTextField, VMenu, VInfiniteScroll, VCard, VListItem } from 'vuetify/components'

import type { KnFormApiObjectSelectField } from '@/types'
import { computed, ref, watch } from 'vue'
import { useKnFormField } from '@/utils/fieldUtils.ts'
import SlotRenderer from '@/components/helpers/SlotRenderer.vue'
import { debounceRef } from '@/utils/vueUtils.ts'
import { randString } from '@/utils/jsUtils.ts'
import Pass from '@/components/helpers/Pass.vue'

const {fieldProps} = defineProps<{
  fieldProps: KnFormApiObjectSelectField
}>()

interface InfiniteScrollLoadOptions {
  side: 'end' | 'start' | 'both'
  done: (status: 'error' | 'loading' | 'empty' | 'ok') => void
}

const _model = defineModel<T>({required: true})

const {model, inputProps, label, inputSlots} = useKnFormField(
    _model,
    fieldProps,
    [ 'append-inner', 'prepend-inner' ]
)

const selectedItem = ref<T | null>(null)

function setSelected(item: T | null) {
  selectedItem.value = item
}

const menuVisible = ref(false)

const items = ref<T[]>([])

const isEmpty = computed(() => !items.value.length)

const filterText = ref('')
const debouncedFilterText = debounceRef(filterText, 500, {
  emitEmptyImmediate: true
})

const infScrollKey = ref(randString())

watch(debouncedFilterText, () => {
  items.value = []
  if (!menuVisible.value) {
    menuVisible.value = true
  }
  infScrollKey.value = randString()
})

// watch(menuVisible, (value) => {
//   if (!value) return
//   fieldProps.apiProvider.preparedList({limit: 25, offset: 0}).then((res) => {
//     console.log(res)
//     items.value.push(...res.items)
//   })
// })

function onLoadMore(options: InfiniteScrollLoadOptions) {
  console.log(options)
  fieldProps.apiProvider.preparedList({
    limit: 25,
    offset: items.value.length ?? 0,
    search: debouncedFilterText.value
  }).then((res) => {
    console.log(res)
    if (!res.items.length) {
      options.done('empty')
      return
    }
    items.value.push(...res.items)
    options.done('ok')
  })
}

function itemAsOption(item: T) {
  return fieldProps.apiProvider.itemAsOption(item)
}


</script>

<template>
  <v-menu
      :close-on-content-click="false" v-model="menuVisible"
      contained
  >
    <template v-slot:activator="{ props }">
      <v-text-field
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
              :bind-props="{selected: item === selectedItem, option: itemAsOption(item as T)}"
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
              />
            </div>
          </pass>
        </template>
        <template #empty>
          <div v-if="isEmpty">
            No data
          </div>
        </template>
      </v-infinite-scroll>
    </v-card>
  </v-menu>
</template>

<style scoped>

</style>
import type { Component, VNode, App, Ref } from 'vue'
import { computed, createVNode, ref, render, watch } from 'vue'
import { debounce } from '@/utils/jsUtils.ts'
import { jsUtils } from '@/index.ts'


export function mount<Props = Record<string, any>>(component: Component, props: Props, app?: App, el?: HTMLDivElement) {
  const vNode: VNode | null = createVNode(component, props as any)
  if (app && app._context)
    vNode.appContext = app._context

  if (el) {
    app?._container.appendChild(el)
    render(vNode, el)
  } else {
    render(vNode, app?._container.firstElementChild)
  }

  return {vNode}
}

export function debounceRef<T = any>(
  valueRef: Ref<T>,
  delay: number,
  options?: {
    emitEmptyImmediate?: boolean
  }
) {
  const internal = ref<T>(valueRef.value)
  const debouncedSet = debounce((v: T) => internal.value = v, delay)

  function setValue(v: T) {
    if (options?.emitEmptyImmediate && jsUtils.isEmpty(v)) {
      internal.value = v
    } else {
      debouncedSet(v)
    }
  }

  watch(valueRef, (v) => {
    setValue(v)
  })
  return computed(() => internal.value)
}
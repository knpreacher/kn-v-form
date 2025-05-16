import type { Component, VNode, App } from 'vue'
import { createVNode, render } from 'vue'


export function mount<Props = Record<string, any>>(component: Component, props: Props, app?: App, el?: HTMLDivElement) {
  const vNode: VNode | null = createVNode(component, props as any)
  if (app && app._context)
    vNode.appContext = app._context

  if (el) {
    app?._container.appendChild(el)
    render(vNode, el)
  } else {
    console.log('app', app)
    render(vNode, app?._container.firstElementChild)
  }

  return {vNode}
}
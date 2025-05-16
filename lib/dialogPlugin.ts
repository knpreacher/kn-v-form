import type { Plugin } from 'vue'
import type { KnSelectDialogData } from '@/types.ts'
import { mount } from '@/utils/vueUtils.ts'
import { dialogs } from '@/components'
import { inject, render } from 'vue'

const dialogInjectKey = 'knDialog'

type DialogMountFunction<Props, Value = any> = (props: Omit<Props, 'resolve'>) => Promise<Value>

export const dialogPlugin: Plugin = {
  install(app) {
    function mountSelectDialog<Value = any>(props: Omit<KnSelectDialogData, 'resolve'>) {
      return new Promise<Value>(async (resolve) => {
        const value = await new Promise<Value>((_resolve) => {
          mount(
            dialogs.KnSelectDialog,
            {
              resolve: _resolve,
              ...props
            },
            app
          )
        })
        setTimeout(() => {
          render(null, app._container.firstElementChild)
          resolve(value)
        }, 100)
      })
    }

    app.provide(dialogInjectKey, {
      select: mountSelectDialog
    })

    app.config.globalProperties.$knDialog = {
      select: mountSelectDialog
    }
  }
}

export function useKnDialog() {
  const dialogs = inject(dialogInjectKey) as Record<string, unknown>
  if (!dialogs)
    throw new Error('Missing dialogs instance')
  const select = dialogs.select as DialogMountFunction<KnSelectDialogData>
  return {
    select
  }
}
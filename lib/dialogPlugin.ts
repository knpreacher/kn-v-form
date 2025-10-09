import type { Plugin } from 'vue'
import { KnCustomDialogData, type KnCustomDialogProps, KnSelectDialogData, KnSubmitDialogData } from '@/types.ts'
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

    function mountCustomDialog<Value = any>(props: Omit<KnCustomDialogData, 'resolve'>) {
      return new Promise<Value>(async (resolve) => {
        const value = await new Promise<Value>((_resolve) => {
          mount(
            props.component,
            {
              resolve: _resolve,
              ...props.componentProps,
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

    function mountSubmitDialog<Pos = boolean, Neg = boolean, Neutral = unknown>(props: Omit<KnSubmitDialogData<Pos, Neg, Neutral>, 'resolve'>) {
      return new Promise<Pos | Neg | Neutral>(async (resolve) => {
        const value = await new Promise<Pos | Neg | Neutral>((_resolve) => {
          mount(
            dialogs.KnSubmitDialog,
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
      select: mountSelectDialog,
      custom: mountCustomDialog,
      submit: mountSubmitDialog
    })

    app.config.globalProperties.$knDialog = {
      select: mountSelectDialog,
      custom: mountCustomDialog,
      submit: mountSubmitDialog
    }
  }
}

export function useKnDialog() {
  const dialogs = inject(dialogInjectKey) as Record<string, unknown>
  if (!dialogs)
    throw new Error('Missing dialogs instance')
  const select = dialogs.select as DialogMountFunction<KnSelectDialogData>
  const custom = dialogs.custom as DialogMountFunction<KnCustomDialogData>
  const submit = dialogs.submit as DialogMountFunction<KnSubmitDialogData>

  return {
    select,
    custom,
    submit
  }
}

export function useKnCustomDialog(props: KnCustomDialogProps) {
  return {
    dialogProps: {
      ...props.dialogProps,
      title: props.title,
      modelValue: true,
      'onUpdate:modelValue': (v: boolean) => {
        if (!v) {
          props.resolve()
        }
      }
    },
    resolve: props.resolve
  }
}
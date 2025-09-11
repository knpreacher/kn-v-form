import { createApp } from 'vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles/main.css'
// import './style.css'
import App from './App.vue'

import './../lib/index.css'
import { dialogPlugin, rulesPlugin,DateFnsAdapter } from '../lib'
// import './../lib/kn-style.css'

const componentOptions = {
  variant: 'solo-filled',
  density: 'comfortable'
}

const vuetify = createVuetify({
  // date: {
  //   adapter: DateFnsAdapter
  // },
  defaults: {
    global: {},
    VDateInput: componentOptions,
    VTextField: componentOptions,
    VMaskInput: componentOptions,
    VTextarea: componentOptions,
    VNumberInput: componentOptions,
    VSelect: componentOptions
  }
})

createApp(App).use(vuetify).use(dialogPlugin).use(rulesPlugin).mount('#app')

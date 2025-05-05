import { createApp } from 'vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles/main.css'
// import './style.css'
import App from './App.vue'

import './../lib/index.css'
// import './../lib/kn-style.css'

const componentOptions = {
  variant: 'solo-filled',
  density: 'comfortable'
}

const vuetify = createVuetify({
  defaults: {
    global: {},
    VTextField: componentOptions,
    VNumberInput: componentOptions,
    VSelect: componentOptions
  }
})

createApp(App).use(vuetify).mount('#app')

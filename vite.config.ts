import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // dts({ insertTypesEntry: true, tsconfigPath: './tsconfig.lib.json' }),
    dts({include: './lib', tsconfigPath: './tsconfig.lib.json', insertTypesEntry: true}),
    vuetify({
      // autoImport: true,
      autoImport: false,
      styles: 'sass'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url))
    }
  },
  // optimizeDeps: {
  //   include: ["vuetify"],
  // },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      // src/main.ts is where we have exported our component(s)
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'KnVFormLib',
      // the name of the output files when the build is run
      fileName: 'index',
      cssFileName: 'index'
    },
    rollupOptions: {
      // Make sure to exclude Vue from the bundle
      // external: [ 'vue', 'vuetify', /vuetify\/.+/ ],
      external: [ 'vue' ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
          // vuetify: 'Vuetify',
          // 'vuetify/components': 'vuetify/components'
        }
      }
    }
  }
  // ssr: {
  //   noExternal: [ /\.css$/, /^vuetify/ ]
  // }
})

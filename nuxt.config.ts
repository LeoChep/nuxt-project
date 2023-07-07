import { defineNuxtConfig } from 'nuxt/config'
import path, { resolve } from "node:path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig ({
  alias:{
    "@plugin":resolve("modules"),
},
  ssr:false,
  modules: [
    
   [ '@pinia/nuxt',
    {
      autoImports: [
        // 自动引入 `defineStore()`
        'defineStore',
        // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
        ['defineStore', 'definePiniaStore'],
      ],
    },
  ],'@element-plus/nuxt'],
    css: [
       
      ],
     
    
})

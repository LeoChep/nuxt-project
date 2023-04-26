import { defineStore } from 'pinia'
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useIframeStore = definePiniaStore('iframeStore', {
  // a function that returns a fresh state
  state: () => ({
    iframes:[] as any[],
    pushApi:(iframe:any)=>{}
  }),
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
    
    },
    push(iframe:any){
        // console.log(iframe)
       this.pushApi(iframe)
      // console.log(this.iframes)
    }
  },
})
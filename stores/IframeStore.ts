import { defineStore } from 'pinia'
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useIframeStore = definePiniaStore('iframeStore', {
  // a function that returns a fresh state
  state: () => ({
    iframes:[] as any[],
  }),
  // optional actions
  actions: {
    count(){return this.iframes.length},
    reset() {
      // `this` is the store instance
    
    },
    push(iframe:any){
      this.iframes.push(iframe)
       
    },
    close(iframe:any){
      let i=0;
      let index=-1;
      for (let temp of this.iframes){
        
        if (iframe==temp)
          index=i;
          i++;
      }
      if (index>=0)
      this.iframes.splice(index,1);
    }
  },
})
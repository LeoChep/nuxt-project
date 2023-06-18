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

      iframe.zIndex=this.count();
       
    },
    close(iframe:any){
      let i=0;
      let index=-1;
      for (let temp of this.iframes){
        if (iframe==temp){
          console.log(i)
          index=i;
        }
          i++;
      }
      if (index>=0)
      this.iframes.splice(index,1);
    },
    top(iframe:any){
      //桶法
      const cache=[] as Array<boolean>
      for (let i=0;i++;i<100)
        cache[i]=false;
      
      for (let temp of this.iframes){
        cache[temp.zIndex]=true;
      }
      let zIndex=0;
      for (let temp of this.iframes){
        while (zIndex<temp.zIndex){
          if (!cache[zIndex]&&zIndex!=temp.zIndex)
          {
            cache[temp.zIndex]=false;
            temp.zIndex=zIndex;
            cache[zIndex]=true;
            break;
          }
          zIndex++;
        }
          
      }
      iframe.zIndex=this.count()
    }
  },
})
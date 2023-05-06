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
      iframe.index=this.count();
       
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
    },
    top(iframe:any){
      //桶法
      const cache=[] as Array<boolean>
      for (let i=0;i++;i<100)
        cache[i]=false;
      
      for (let temp of this.iframes){
        cache[temp.index]=true;
     //   console.log(temp.index)
      }
   //   console.log(cache)
      let index=0;
      for (let temp of this.iframes){
        while (index<temp.index){
          if (!cache[index]&&index!=temp.index)
          {
       //     console.log(index)
            cache[temp.index]=false;
            temp.index=index;
            cache[index]=true;
            break;
          }
          index++;
        }
          
      }
      iframe.index=this.count()
  //    console.log(this.iframes)
    }
  },
})
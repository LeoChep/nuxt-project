import { defineStore } from 'pinia'
import { useIndexDbStore } from './IndexDbStore'
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMessageStore = definePiniaStore('chatMessageStore', {
  // a function that returns a fresh state
  state: () => {
    let messages=[] as any[];

    return {
    messages:messages,
    isInit:false}
  },
  // optional actions
  actions: {
    count(){return this.messages.length},
    init(){
      let dbStore=useIndexDbStore();
      dbStore.open().then((res)=>{
        dbStore.getMessages().then((res :any)=>{
          for (let message of res){
            console.log("添加"+message);
            this.messages.push(message)
          }
          this.isInit=true;
        });
      })
  
    },
    reset() {
      // `this` is the store instance
      //应该只获取没有的 todo

    },

    push(message:any){
      this.messages.push(message)
      let dbStore=useIndexDbStore();
      dbStore.putMessage(message)
    },

  },
})
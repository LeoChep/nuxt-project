// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMessageStore = definePiniaStore("chatMessageStore", {
  // a function that returns a fresh state
  state: () => {
    let subscribers=[] as any[]
    
    return {
      
    };
  },
  // optional actions
  actions: {},
});

<template>
    <div >
      <button @click="createChatFunc()">create chat window</button>
      <h1>Welcome to the homepage</h1>
      <UiIframeManeger>
        This is an auto-imported component
      </UiIframeManeger>
      <UiMainPageCreateCharacter></UiMainPageCreateCharacter>
      <DiceBabylonView></DiceBabylonView>
     
    </div>
  </template>
<script lang="tsx"  setup >

import { useIframeStore } from '@/stores/IframeStore';
import  ChatWindow  from '@/components/ui/mainPage/ChatWindow.vue';

const iframeStore = useIframeStore();
const count=computed(()=>{
    return iframeStore.count()
});
const createChatFunc = () => {
    console.log("create")
    const content =<ChatWindow></ChatWindow>
    iframeStore.push(content)
}
</script>
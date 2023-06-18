<template>
    {{ count }}
    <button @click="createCharacterFunc()">创建角色</button>
    <button @click="createChatFunc()">创建聊天</button>
    <ChatWindow></ChatWindow>
</template>
<script lang="tsx"  setup >

import { useIframeStore } from '@/stores/IframeStore';
import MyIframeVue from '@/components/character/sheet.vue';
import ChatWindow from './ChatWindow.vue';
const iframeStore = useIframeStore();
const count=computed(()=>{
    return iframeStore.count()
});
const createCharacterFunc = () => {
    console.log("create")

    const content =<MyIframeVue></MyIframeVue>
    iframeStore.push(content)
}
const createChatFunc = () => {
    console.log("create")
    const content =<ChatWindow></ChatWindow>
    iframeStore.push(content)
}
</script>
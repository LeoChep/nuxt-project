<template>
    <button @click="createCharacterFunc()">创建角色</button>
</template>
<script setup>

import { useIframeStore } from '@/stores/IframeStore';
import MyIframeVue from '../MyIframe.jsx';
const iframeStore = useIframeStore();
const createCharacterFunc=()=>{
    console.log("create")

    const content=h(MyIframeVue)
    iframeStore.push(content)
}
</script>
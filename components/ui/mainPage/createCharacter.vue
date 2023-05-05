<template>
    {{ count }}
    <button @click="createCharacterFunc()">创建角色</button>
</template>
<script lang="tsx"  setup >

import { useIframeStore } from '@/stores/IframeStore';
import MyIframeVue from '@/components/character/sheet.vue';

const iframeStore = useIframeStore();
const count=computed(()=>{
    return iframeStore.count()
});
const createCharacterFunc = () => {
    console.log("create")

    const content =<MyIframeVue></MyIframeVue>
    iframeStore.push(content)
}
</script>
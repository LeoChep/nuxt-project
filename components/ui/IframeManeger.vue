<template>
<div v-for="(item, index) in iframes">
        <UiIframeWindow :content="item"></UiIframeWindow>
	</div>
</template>
<script setup>
import { useIframeStore } from '@/stores/IframeStore';
import MyIframeVue from './MyIframe.jsx';
import { ref } from 'vue'
const iframes=ref([])
const iframeStore = useIframeStore();

const push=(content)=>{
        iframes.value.push(content)
}
iframeStore.pushApi=push
const content=h(MyIframeVue)
push(content)

// const content2=h(MyIframeVue)
// iframeStore.push(content2)
</script>
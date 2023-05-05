<template>
<div   v-for="(item, index) in iframes">
        <UiIframeWindow :content="item"></UiIframeWindow>
	</div>
</template>
<script setup>
import { useIframeStore } from '@/stores/IframeStore';

const iframeStore = useIframeStore();
const iframes=computed(()=>{return iframeStore.iframes})

</script>

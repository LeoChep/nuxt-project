<script lang="ts" setup>
import { useIframeStore } from '@/stores/IframeStore';
import { h } from 'vue';
const iframeStore = useIframeStore();
const props = defineProps(['content'])
const Content = () => h(props.content)
// const show = ref(true);
const box = ref(true);
const close = () => {
  //show.value = !show.value;
  iframeStore.close(props.content)
};

</script>
<template>
  <UiNewWindow  :closeFun=close :resize-able="true" drag-able closeShow fullShow
    width="70vh" height="85vh">
    <Content />
  </UiNewWindow>
</template>
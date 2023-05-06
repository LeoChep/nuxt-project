<script lang="ts" setup>
import { useIframeStore } from '@/stores/IframeStore';
import { h } from 'vue';
const iframeStore = useIframeStore();
const props = defineProps(['content'])
const Content = () => h(props.content)
const box = ref(true);
const zIndex=ref("")
const close = () => {
  //show.value = !show.value;
  iframeStore.close(props.content)
};
const top =()=>{
  iframeStore.top(props.content)
  zIndex.value=props.content.index.toString();
}
iframeStore.$onAction((
  { name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子}
  }
)=>{
  after((result:any)=>{
    if (name=='top'){
      zIndex.value=props.content.index.toString();
    }
  })
})


</script>
<template>
  <UiNewWindow  :closeFun=close  :resize-able="true" drag-able closeShow fullShow
    width="70vh" height="85vh" @click="top()" :zIndex=zIndex :touchFun=top>
    <Content />
  </UiNewWindow>
</template>
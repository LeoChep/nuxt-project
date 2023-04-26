<script>
import { h } from 'vue';

export default {
    props: ['content'],
    setup(props) {
    const count = ref(1)

    // 返回渲染函数
    return () => h(props.content)
  }
}

</script>
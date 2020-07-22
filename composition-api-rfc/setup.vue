<template>
  <div>{{ count }}{{ object.foo }}</div>
</template>
<script>
// import { ref, reactive } from 'vue'
import Vue from 'vue'

import { plugin as VueFunctionApiPlugin } from 'vue-function-api'

Vue.use(VueFunctionApiPlugin)
export default {
  // 注意setup返回ref在模板中会自动解开 不需要写.value
  // setup() {
  //   const count = ref(0)
  //   const object = reactive({ foo: 'bar' })
  //   return {
  //     count,
  //     object
  //   }
  // }
  // props: {
  //   name: String
  // },
  // setup(props, context) {
  //   // 注意props对象是响应式的 watchEffect或watch会观察和响应props的更新
  //   console.log(props.name, context.attrs, context.slots, context.emit)
  //   const count = ref(0)
  //   const object = reactive({ foo: 'bar' })
  //   return () => h('div', [count.value, object.foo])
  //   watchEffect(() => {
  //     console.log(`name is: ` + props.name)
  //   })
  // }
  // setup(props, { attrs }) {
  //   function onClick() {
  //     console.log(attrs.foo)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
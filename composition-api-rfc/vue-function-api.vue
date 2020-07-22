<template>
  <div>
    <span>count is {{ count }}</span>
    <span>plusOne is {{ plusOne }}</span> 
    <button @click="increment">count++</button>
  </div>
</template>
<script>

import Vue from 'vue'

import { plugin as VueFunctionApiPlugin } from 'vue-function-api'

Vue.use(VueFunctionApiPlugin)

export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },

  setup(prop, context) {
    // value函数创造一个包装对象 它包含一个响应式属性value：
    const count = value(0)

    const plusOne = computed(() => count.value + 1)

    const increment = () => {
      count.value ++
    }

    watch(() => count.value * 2, val => {
      console.log(`count * 2 is ${val}`)
    })

    onMounted(() => {
      console.log('mounted')
    })

    return {
      count,
      plusOne,
      increment
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

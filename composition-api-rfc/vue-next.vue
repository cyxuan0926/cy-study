<template>
  <div>
    <p>{{ wrappValue }}</p>
    <span>count is {{ count }}</span>
    <span>plusOne is {{ plusOne }}</span>
    <button @click="increment">count++</button>
  </div>
</template>

<script>
import { value, computed, watch, onMounted } from 'vue'

export default {
  // 函数式风格的入口是setup函数 setup函数返回值就是注入到页面模板的变量 我们也可以返回一个函数 通过使用value这个API产生属性并修改
  setup(props) {
    // 要注意的是 value()返回一个对象 通过.value才能访问到其真实值 那既然所有value()返回的值都是包装对象 给模板使用时 直接使用 不需要.value属性
    const msg = value('hello')

    const appendName = () => {
      msg.value = `hello ${props.name}`
    }
    const count = value(0)

    const plusOne = computed(() => count.value + 1)

    const increment = () => {
      conut.value ++
    }

    watch(() => count.value * 2, val => {
      console.log(`count * 2 is ${ val }`)
    })

    onMounted(() => {
      console.log('mounted')
    })

    return {
      wrappValue: value(0),
      count,
      plusOne,
      increment,
      msg,
      appendName
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

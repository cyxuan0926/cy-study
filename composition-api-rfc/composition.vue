<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>
<script>
import { reactive, computed, watchEffect } from 'vue'
export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })
    function increment() {
      const abc = ref(0)
      state.count++;
    }
    wactchEffect(() => {
      document.body.innerHTML = `count is ${state.count}`
    })
    return {
      state,
      increment
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
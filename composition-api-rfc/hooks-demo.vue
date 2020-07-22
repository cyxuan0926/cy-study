<template>
</template>

<script>

// 鼠标实时位置的例子
function useMouse() {
  const x = value(0)

  const y = value(0)

  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return {
    x,
    y
  }
}

const Component = {
  setup() {
    // useMouse函数内改变x、y后 不会重新触发setup执行
    // x、y拿到的都是wrapper而不是原始值 且这个值会动态变化
    const { x, y } = useMouse()

    const { z } = useOtherLogic()

    return {
      x,
      y,
      z
    }
  },
  template: `<div>{{ x }} {{ y }} {{ z }}</div>`
}

const MyComponent = {
  props: {
    id: Number
  },

  setup(props) {
    const data = value(null)

    // 在Vue中 setup函数仅执行一次
    watch(() => props.id, async (id) => {
      data.value = await fetchData(id)
    })
  }
}

// Vue 与 React逻辑结构
// Vue3.0的setup函数也是可选的 再配合其支持的TSX功能 与React真的只有Mutable区别

const structComponent = {
  setup(props) {
    const x = value(0)

    const setXRandom = () => {
      x.value = Math.random()
    }

    return {
      x,
      setXRandom
    }
  },

  template: `<button @onClick="setXRandom">{{ x }}</button>`
}
export default {}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

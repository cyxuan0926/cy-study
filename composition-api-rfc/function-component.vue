<template>
</template>
<script>

// function component 就是以Function的形式创建的React组件 也就是 一个返回JSX或createElment的function就可以当作React组件 这种形式的组件就是Function Component
// 什么是Hooks Hooks是辅助Function Component的工具 比如 useState就是一种Hooks 用来管理状态

function App() {
  return (
    <div>
      <p>App</p>
    </div>
  )
}

function Counter() {
  const [ count, setCount ] = useState(0)

  return (
    <div>
      <p>You clicked { count } times</p>
      <button onClick = { () => setCount(count + 1)}>Click me</button>
    </div>
  )
}
export default {}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

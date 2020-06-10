<template>
  <div id="app">
    <ChatBox msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ChatBox from './components/ChatBox1.vue'

export default {
  name: 'App',
  components: {
    ChatBox
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

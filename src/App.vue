<template>
  <img style="height: 10vh;" alt="Vue logo" src="./assets/logo.png" />
  <Home msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './components/Home.vue'

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>

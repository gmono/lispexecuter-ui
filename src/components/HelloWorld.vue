<template>
  <h1>{{ msg }}</h1>
  <el-button>testabcd</el-button>
  <el-input type="textarea" v-model="text" placeholder="输入" :rows="10" ></el-input>
  <el-button type="primary">执行</el-button>
  <div>{{count}}</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0)
    const text=ref("")
    return { count,text }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

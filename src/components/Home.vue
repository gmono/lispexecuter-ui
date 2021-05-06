<template>
  <ul class="replResult">
    <li class="replItem" :class="item.type" v-for="item,key in data.resultList" :key="key">
      <span class="replID">[{{ key }}]:</span>
      <span style="display:inline-block">
        <div style="font-weight: border;font-size: small;">{{ item.type }}</div>
        <div>{{ item.message }}</div>
      </span>
    </li>
  </ul>
  <el-input v-model="data.nowInput" placeholder="输入命令后回车" @keypress.enter="keypress"></el-input>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { LispExecuter, StreamParser } from "lispexecute"
interface ResultItem {
  type: "command" | "result" | "error"
  message: string;
}
export default defineComponent({
  name: 'Home',
  props: {
  },
  setup: () => {
    let executer = new LispExecuter(window);
    let data = reactive({
      resultList: [] as ResultItem[],
      nowInput: ""
    });
    let keypress = () => {
      if(data.nowInput.trim()=="") return;
      data.resultList.push({ message: data.nowInput, type: "command" });
      //执行并得到结果
      try {
        let res = executer.Run(StreamParser.Parse(data.nowInput.trim()))
        data.resultList.push({ message: res, type: "result" })
      }
      catch (e) {
        data.resultList.push({ message: e.message, type: "error" })
      } finally {
        data.nowInput = "";
      }
    }
    return { data, keypress }
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

.replResult {
  border: 1px grey solid;
  list-style: none;
  text-align: left;
  min-height: 50vh;
  padding: 0;
}
.replItem {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.replID {
  padding-left: 3rem;
  padding-right: 1rem;
  vertical-align: top;
}
.replItem.command {
  background-color: rgb(255, 255, 255);
}
.replItem.error {
  background-color: rgba(247, 79, 2, 0.418);
}
.replItem.result {
  background-color: rgba(127, 255, 212, 0.4);
}
</style>

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div :class="{fixed:top>130}">
      <input type="text" v-model="state.newTodo" @keyup.enter="addNewTodo">
    </div>
    <ul>
      <li v-for="(todo, index) in state.todos" :key="index">{{todo.title}}</li>
    </ul>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script lang='ts'>
// 按需引入，只打包引入的 tree-shaking
import {reactive, ref, computed, onMounted, watchEffect} from 'vue'
import useScroll from './scroll'

export default {
  setup(){
    // reactive把对象变成响应式
    const state = reactive({
      newTodo: '',
      todos: [
        {id:1, title:'aaaa', computed:false},
        {id:2, title:'bbbb', computed:false}
      ],
      msg: 'Welcome to Your Vue.js App'
    })
    function addNewTodo(){
      const val = state.newTodo
      if(!val) return
      state.todos.push({
        id:state.todos.length + 1,
        title:val,
        computed:false
      })
      state.newTodo = ''
    }
    watchEffect(()=>{
      console.log('state is', state)
    })
    // 新增滚动fixed
    const {top} = useScroll()
    console.log(top)
    return {state, addNewTodo, top}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fixed{
  position: fixed;
  top: 20px;
  left: 20px
}
</style>

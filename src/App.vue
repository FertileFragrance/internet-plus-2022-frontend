<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <PenaltyManage/> -->
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import PenaltyManage from "./components/PenaltyManage.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    // PenaltyManage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

.container {
  height: 100%;
}
</style>

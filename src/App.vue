<template>
  <div id="app">
    <header-bar></header-bar>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar";

export default {
  name: "app",
  components: {
    HeaderBar
  }
};
</script>

<style>
html,body {
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
}
.view {
  height: calc(100% - 90px);
  overflow: hidden;
}
</style>

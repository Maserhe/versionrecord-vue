<template>
  <div id="root">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Lato,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;

  font-weight: 400;
  font-size: 14px;
}
#root, body, html {
    height: 100%;
    color: rgb(85, 85, 85);
}
.ant-layout {
  background: #fff;
}
</style>

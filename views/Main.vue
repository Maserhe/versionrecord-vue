<template>
  
  <a-layout>
    <a-layout-header style="height: 60px; background-color: rgb(255, 255, 255); border-bottom: 1px solid rgb(232, 232, 232); position: fixed; top: 0px; z-index: 999; width: 100%; display: block;">
      <Header></Header>
    </a-layout-header>

    <a-layout-content style="background-color: rgb(255, 255, 255); min-height: 1000px;">
      <router-view></router-view>
    </a-layout-content>

    <a-layout-footer >
      <Footer></Footer>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Header from '../src/components/Header.vue'
import Footer from '../src/components/Footer.vue'

export default {
    name: 'Main',
    components: {
      Header,
      Footer,
    }
}
</script>

<style>

</style>
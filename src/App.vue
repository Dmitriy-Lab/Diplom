<template>
  <div id="app">
    <HeaderComp />
    <router-view></router-view>
    <FooterComp />
  </div>
</template>

<script>
import FooterComp from './components/FooterComp.vue';
import HeaderComp from './components/HeaderComp.vue';

export default {
  name: 'App',
  components: {
    FooterComp, HeaderComp,
}
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

</style>

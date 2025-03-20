<template>
  <HanziLookup :boardSize="400" />
</template>

<script>
import HanziLookup from './components/base/HanziLookup.vue';

export default {
  name: 'App',
  components: {
    HanziLookup
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
}
</style>

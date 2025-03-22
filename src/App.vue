<template>
  <MainLayout />
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import router from '@/router';

export default {
  name: "App",
  components: {
    MainLayout,
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
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}
</style>

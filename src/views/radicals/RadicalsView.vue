<template>
  <div>
    <h1>Radicals Component</h1>
    <p>This is the content for the Radicals tab.</p>
    <HanziLookup width="600"/>
  </div>
</template>

<script>
import HanziLookup from "@/components/base/HanziLookup.vue"
export default {
  name: 'Radicals',
  components: {
    HanziLookup
  }
};
</script>

<style scoped>
/* Add styles here if necessary */
</style>
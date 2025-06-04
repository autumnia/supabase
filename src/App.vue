<template>
  <Navbar />
  <router-view />  
</template>

<style scoped lang="scss">
  button {
    background: var(--main-color-light);
    border-radius: 0;
  }
</style>

<script setup>
import Navbar from './components/Navbar.vue';
import { onMounted, ref } from 'vue';

</script>
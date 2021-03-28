<template>
  <div>
    <h1>Heroes random list</h1>
    <random-heroes/>
  </div>
</template>

<script>
import RandomHeroes from '../components/heroes/RandomHeroes.vue';

export default {
  name: 'Home',
  components: {
    RandomHeroes,
  },
};
</script>

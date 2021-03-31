<template>
  <div>
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

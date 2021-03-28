<template>
  <div>
    <h1>Heroes list</h1>
    <list-all-heroes/>
  </div>
</template>

<script>
import ListAllHeroes from '../components/heroes/ListAllHeroes.vue';

export default {
  name: 'ListHeroes',
  components: {
    ListAllHeroes,
  },
};
</script>

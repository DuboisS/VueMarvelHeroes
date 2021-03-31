<template>
  <div>
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

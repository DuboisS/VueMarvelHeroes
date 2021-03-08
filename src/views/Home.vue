<template>
  <div>
    Accueil
    <ListHeroes/>
  </div>
</template>

<script>
import ListHeroes from '@/components/heroes/ListHeroes.vue';

export default {
  name: 'Home',
  components: {
    ListHeroes,
  },
};
</script>

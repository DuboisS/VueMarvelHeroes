<template>
  <div>
      <router-link :to="{ name: 'HeroeDetails', params: { id: heroe.id }}">
          <img :src="heroe.thumbnail.path + '.' + heroe.thumbnail.extension" :height="50">
          {{ heroe.name }}
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'Heroe.vue',
  props: {
    heroe: Object,
  },
};
</script>

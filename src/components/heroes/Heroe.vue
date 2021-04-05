<template>
  <div>
    <router-link :to="{ name: 'HeroeDetails', params: { id: heroe.id }}">
      <vs-list-item :title="heroe.name" vs-justify="left">
        <template slot="avatar">
          <vs-avatar size="large" :src="heroe.thumbnail.path + '.' + heroe.thumbnail.extension"
                     :height="50"/>
        </template>
      </vs-list-item>
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

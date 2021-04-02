<template>
  <div id="app">
    <vs-navbar class="nabarx" color="#ED1D24" text-color="white">
      <div slot="title">
        <vs-navbar-title style="color: white">
          Heroes
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <router-link to="/">Home</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <router-link to="/heroes">All heroes</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <router-link to="/team">My team</router-link>
      </vs-navbar-item>
    </vs-navbar>
    <router-view/>
  </div>
</template>

import Vue from 'vue';
import Vuesax from 'vuesax';
import VueSession from 'vue-session';
import App from './App.vue';
import './filters/StringFilter';
import router from './router';
import 'vuesax/dist/vuesax.css';

Vue.use(Vuesax);
Vue.use(VueSession);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

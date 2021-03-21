import Vue from 'vue';

Vue.filter('formatStringDate', (value) => {
  if (value) {
    return new Date(value).toDateString();
  }

  return false;
});

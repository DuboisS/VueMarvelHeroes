import Vue from 'vue';

/**
 * Storage of several reusable functions related to string values
 */
Vue.filter('formatStringDate', (value) => {
  if (value) {
    return new Date(value).toDateString();
  }

  return false;
});

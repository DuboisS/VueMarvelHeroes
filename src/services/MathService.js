/**
 * Storage of several reusable functions related to the Math class
 */
export default {
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

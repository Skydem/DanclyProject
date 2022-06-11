<template>
  <div>
    <h1>HomeView</h1>
    <div class="fun-area">
      ah no tak
      <button @click="test">klik me pls</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  methods: {
    test() {
      const testArray = [1, 2, 3, 4, 5];
      const testArray2 = [2, 4, 6];
      const result = testArray.filter((x) => !testArray2.includes(x));
      console.log(result);
    },
  },
};
</script>

<style>
.fun-area {
  margin-top: 50px;
}
</style>

<template>
  <div class="card-container">
    <slot>
      error loading person, swipe to continue
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
};
</script>

<style>
.card-img {
  width: 400px;
  height: 500px;
  object-fit: cover;
}
.card-container {
  position: fixed;
  /* border-style: solid; */
  background-color: white;
  border-radius: 27px;
  overflow: hidden;
  box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.147);
  top: 10%;
}
.card-padding {
  padding: 15px;
}

</style>

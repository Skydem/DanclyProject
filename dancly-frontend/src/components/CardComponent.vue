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

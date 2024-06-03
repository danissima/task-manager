<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss">
  .container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 64px;

    @include break($lg) {
      padding: 0 32px;
    }

    @include break($md) {
      padding: 0 20px;
    }
  }
</style>

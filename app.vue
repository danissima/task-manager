<template>
  <TheHeader />
  <main class="main">
    <NuxtPage />
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
  useHead({
    titleTemplate(title) {
      if (!title) {
        return 'Задачник'
      }

      return `${title} | Задачник`
    },
  })
</script>

<style lang="scss">
  html,
  body,
  #__nuxt {
    height: 100%;
  }

  #__nuxt {
    flex-direction: column;
    display: flex;
    min-height: 100%;
    height: auto;
  }

  .main {
    height: 100%;
  }
</style>

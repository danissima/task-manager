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
        return 'Task Manager'
      }

      return `${title} | Task Manager`
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
    margin-bottom: toRem(32);
  }
</style>

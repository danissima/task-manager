<template>
  <header :class="classes">
    <AppContainer>
      <div class="header__content">
        <h1>
          <NuxtLink to="/">Задачник</NuxtLink>
        </h1>
        <UButton
          v-if="isUserLogged"
          color="red"
          variant="outline"
          @click="logout"
        >
          Выход
        </UButton>
      </div>
    </AppContainer>
  </header>
</template>

<script setup lang="ts">
  import { useUsersStore } from '~/store/users'

  const usersStore = useUsersStore()
  const { logout } = usersStore
  const { isLogged: isUserLogged } = storeToRefs(usersStore)

  const classes = computed<Record<string, boolean>>(() => {
    return {
      header: true,
      header_spaced: isUserLogged.value,
    }
  })
</script>

<style lang="scss">
  .header {
    padding: toRem(24) 0;

    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &_spaced &__content {
      justify-content: space-between;
    }
  }
</style>

<template>
  <section class="tasks">
    <AppContainer>
      <h2
        v-if="userName"
        class="tasks__title"
      >
        С возвращением, {{ userName }}!
      </h2>
      <div class="tasks__grid">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :info="task"
        />
      </div>
    </AppContainer>
  </section>
</template>

<script lang="ts" setup>
  import { useTasksStore } from '~/store/tasks'
  import { useUsersStore } from '~/store/users'

  useHead({
    title: 'Главная',
  })

  definePageMeta({
    middleware: ['auth'],
  })

  const { tasks } = useTasksStore()
  const { currentUser } = storeToRefs(useUsersStore())

  const userName = computed<string>(() => {
    if (!currentUser.value) return ''

    return currentUser.value.email.split('@')[0]
  })
</script>

<style lang="scss">
  .tasks {
    padding: toRem(40) 0;

    &__title {
      text-align: center;
      margin-bottom: toRem(24);
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: toRem(16);

      @include break($md) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>

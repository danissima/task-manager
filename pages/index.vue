<template>
  <main class="main">
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
            v-for="task in tasksToShow"
            :key="task.id"
            :info="task"
          />
        </div>
        <div class="tasks__pagination">
          <UPagination
            v-model="currentPage"
            :page-count="TASKS_PER_PAGE"
            :total="tasks.length"
          />
        </div>
      </AppContainer>
    </section>
    <section class="new-task">
      <AppContainer>
        <h2>Новая задача</h2>
        <NewTaskForm />
      </AppContainer>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { type Task, useTasksStore } from '~/store/tasks'
  import { useUsersStore } from '~/store/users'

  useHead({
    title: 'Главная',
  })

  definePageMeta({
    middleware: ['auth'],
  })

  const { tasks } = storeToRefs(useTasksStore())
  const { currentUser } = storeToRefs(useUsersStore())

  const TASKS_PER_PAGE: number = 3
  const currentPage = ref<number>(1)

  const tasksToShow = computed<Task[]>(() => {
    const startIndex = (currentPage.value - 1) * TASKS_PER_PAGE
    const endIndex = startIndex + TASKS_PER_PAGE

    return tasks.value.slice(startIndex, endIndex)
  })

  const userName = computed<string>(() => {
    if (!currentUser.value) return ''

    return currentUser.value.email.split('@')[0]
  })
</script>

<style lang="scss">
  .tasks {
    padding: toRem(40) 0;

    &__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: toRem(16);
    }

    &__pagination {
      display: flex;
      justify-content: center;
      margin-top: toRem(24);
    }
  }
</style>

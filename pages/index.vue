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
        <TasksFilters />

        <template v-if="filteredTasks.length">
          <div class="tasks__grid">
            <TaskCard
              v-for="task in filteredTasks"
              :key="task.id"
              :info="task"
            />
          </div>
          <div class="tasks__pagination">
            <UPagination
              v-model="pagination.currentPage"
              :page-count="pagination.tasksPerPage"
              :total="pagination.totalTasks"
            />
          </div>
        </template>

        <p
          v-else
          class="tasks__empty"
        >
          Не найдено задач по выбранным фильтрам :(
        </p>
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
  import { useTasksStore } from '~/store/tasks'
  import { useUsersStore } from '~/store/users'

  useHead({
    title: 'Главная',
  })

  definePageMeta({
    middleware: ['auth'],
  })

  const { filteredTasks, pagination } = storeToRefs(useTasksStore())
  const { currentUser } = storeToRefs(useUsersStore())

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
      margin: toRem(24) 0;
    }

    &__pagination {
      display: flex;
      justify-content: center;
    }

    &__empty {
      text-align: center;
      margin: toRem(24) 0;
    }
  }
</style>

<template>
  <section class="tasks">
    <AppContainer>
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

  definePageMeta({
    middleware: ['auth'],
  })

  const { tasks } = useTasksStore()
</script>

<style lang="scss">
  .tasks {
    padding: toRem(40) 0;

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

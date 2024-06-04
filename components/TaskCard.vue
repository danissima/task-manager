<template>
  <UCard class="task-card">
    <template #header>
      <h3>{{ info.id }}. {{ info.title }}</h3>
    </template>

    <p>{{ info.description }}</p>

    <template
      v-if="currentUser?.role === 'admin'"
      #footer
    >
      <UButton
        size="sm"
        icon="i-heroicons-pencil-square"
        color="primary"
        variant="soft"
        :trailing="false"
        >Редактировать</UButton
      >
    </template>
  </UCard>
</template>

<script lang="ts" setup>
  import type { Task } from '~/store/tasks'
  import { useUsersStore } from '~/store/users'

  interface Props {
    info: Task
  }

  defineProps<Props>()

  const { currentUser } = useUsersStore()
</script>

<style lang="scss">
  .task-card {
    display: flex;
    flex-direction: column;

    & > div:last-child {
      margin-top: auto;
    }
  }
</style>

<template>
  <UCard class="task-card">
    <template #header>
      <header class="task-card__header">
        <h3>{{ info.id }}. {{ info.title }}</h3>
        <div class="task-card__badge">

        <UBadge
          v-if="info.isCompleted"
          color="green"
          label="Выполнена"
        />
        <UBadge
          v-else
          color="red"
          label="Не выполнена"
        />
        </div>
      </header>

      <div class="task-card__creator">
        <i>{{ info.creatorEmail }}</i>
      </div>
    </template>

    <p v-if="info.description">{{ info.description }}</p>

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

    &__header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: toRem(8);
      margin-bottom: toRem(8);

      @include break($md) {
        grid-template-columns: auto;
      }
    }

    &__creator {
      font-size: toRem(14);
      color: $gray-100;
    }

    & > div:last-child {
      margin-top: auto;
    }
  }
</style>

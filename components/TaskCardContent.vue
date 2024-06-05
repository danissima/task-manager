<template>
  <UCard class="task-card">
    <template #header>
      <header class="task-card__header">
        <h3>{{ info.id }}. {{ info.title }}</h3>

        <!-- плашка статуса -->
        <div class="task-card__badge">
          <template v-if="!isEditing">
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
          </template>
          <UCheckbox
            v-else
            v-model="formState.isCompleted"
            label="Выполнена"
            name="isCompleted"
          />
        </div>
      </header>

      <div class="task-card__creator">
        <i>{{ info.creatorEmail }}</i>
      </div>
    </template>

    <!-- описание -->
    <p v-if="!isEditing && info.description">{{ info.description }}</p>
    <UTextarea
      v-if="isEditing"
      v-model="formState.description"
      name="description"
    />

    <!-- управление -->
    <template
      v-if="currentUser?.role === 'admin'"
      #footer
    >
      <UButton
        v-if="!isEditing"
        size="sm"
        icon="i-heroicons-pencil-square"
        color="primary"
        variant="soft"
        @click="emits('editing-change', !isEditing)"
      >
        Редактировать
      </UButton>
      <UButton
        v-else
        size="sm"
        icon="i-heroicons-document-check"
        color="primary"
        variant="soft"
        type="submit"
      >
        Сохранить
      </UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
  import type { Task, TaskEditingState } from '~/store/tasks'
  import { useUsersStore } from '~/store/users'

  interface Emits {
    (e: 'editing-change', isEditing: boolean): void
  }

  interface Props {
    info: Task
    isEditing: boolean
  }

  const emits = defineEmits<Emits>()

  defineProps<Props>()

  const { currentUser } = useUsersStore()

  const formState = defineModel<TaskEditingState>('formState', {
    default: {
      description: '',
      isCompleted: false,
    },
  })
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

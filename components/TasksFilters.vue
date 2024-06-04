<template>
  <UForm
    :state="filters"
    class="tasks-filters"
  >
    <UFormGroup
      label="Название задачи"
      name="taskName"
    >
      <UInput
        v-model="filters.searchString"
        type="search"
        placeholder="Сделать дело"
      />
    </UFormGroup>

    <UFormGroup
      label="Создатель задачи"
      name="creator"
    >
      <USelectMenu
        v-model="filters.creator"
        :options="creatorsOptions"
        value-attribute="value"
        option-attribute="label"
      />
    </UFormGroup>

    <UFormGroup
      label="Статус"
      name="isCompleted"
    >
      <USelectMenu
        v-model="filters.isCompleted"
        :options="completionOptions"
        value-attribute="value"
        option-attribute="label"
      />
    </UFormGroup>

    <UFormGroup label="Сортировка">
      <UButton
        block
        :icon="sortButtonProps.icon"
        color="white"
        @click="toggleSort"
      >
        {{ sortButtonProps.content }}
      </UButton>
    </UFormGroup>
  </UForm>
</template>

<script lang="ts" setup>
  import { useTasksStore, type TasksFilters } from '~/store/tasks'
  import { useUsersStore } from '~/store/users'

  interface CreatorOption {
    value: TasksFilters['creator']
    label: string
  }

  interface CompletionOption {
    value: TasksFilters['isCompleted']
    label: 'Любой' | 'Выполнена' | 'Не выполнена'
  }

  interface SortButtonProps {
    content: 'По убыванию' | 'По возрастанию'
    icon: 'i-heroicons-arrow-down' | 'i-heroicons-arrow-up'
  }

  const { filters } = storeToRefs(useTasksStore())
  const { usersEmails } = useUsersStore()

  const completionOptions: CompletionOption[] = [
    {
      value: 'maybe',
      label: 'Любой',
    },
    {
      value: true,
      label: 'Выполнена',
    },
    {
      value: false,
      label: 'Не выполнена',
    },
  ]

  const creatorsOptions = computed<CreatorOption[]>(() => {
    const usersEmailsOptions: CreatorOption[] = usersEmails.map(user => {
      return {
        value: user,
        label: user,
      }
    })

    return [
      {
        value: 'anyone',
        label: 'Кто угодно',
      },
      ...usersEmailsOptions,
    ]
  })

  const sortButtonProps = computed<SortButtonProps>(() => {
    return {
      content: filters.value.isSortAscending ? 'По возрастанию' : 'По убыванию',
      icon: filters.value.isSortAscending
        ? 'i-heroicons-arrow-up'
        : 'i-heroicons-arrow-down',
    }
  })

  function toggleSort() {
    filters.value.isSortAscending = !filters.value.isSortAscending
  }
</script>

<style lang="scss">
  .tasks-filters {
    --columns: 4;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: toRem(8);

    @include break($lg) {
      --columns: 2;
      gap: toRem(16) toRem(8);
    }

    @include break($md) {
      --columns: 1;
      gap: toRem(16);
    }
  }
</style>

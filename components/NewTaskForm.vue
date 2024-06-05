<template>
  <UForm
    :state="state"
    :schema="schema"
    class="form"
    @submit="handleSubmit"
  >
    <UFormGroup
      label="Название"
      name="title"
    >
      <UInput
        v-model="state.title"
        placeholder="Приготовить еду"
        autocomplete="off"
      />
    </UFormGroup>

    <UFormGroup
      label="Описание"
      name="description"
    >
      <UTextarea
        v-model="state.description"
        autoresize
        :maxrows="5"
        placeholder="Приготовить вкусную еду на обед"
      />
    </UFormGroup>

    <UFormGroup
      label="Ваша почта"
      name="creatorEmail"
    >
      <UInput
        v-model="state.creatorEmail"
        placeholder="me@example.com"
        autocomplete="off"
      />
    </UFormGroup>

    <UButton
      block
      type="submit"
    >
      Создать
    </UButton>
  </UForm>
</template>

<script lang="ts" setup>
  import { object, string, type InferType } from 'yup'
  import type { FormSubmitEvent } from '#ui/types'
  import { useUsersStore } from '~/store/users'
  import { useTasksStore, type TaskCreationState } from '~/store/tasks'

  const { currentUser } = storeToRefs(useUsersStore())
  const { addTask } = useTasksStore()

  const schema = object({
    title: string()
      .required('Обязательное поле')
      .min(3, 'Слишком короткое название')
      .max(25, 'Слишком длинное название'),
    description: string().default(''),
    creatorEmail: string()
      .email('Неверная почта')
      .required('Обязательное поле')
      .test(
        'emailConfirm',
        'Почта не совпадает с текущей',
        value => value === currentUser.value?.email,
      ),
  })

  type Schema = InferType<typeof schema>

  const state = ref<TaskCreationState>({
    title: '',
    description: '',
    creatorEmail: '',
  })

  function handleSubmit(event: FormSubmitEvent<Schema>) {
    addTask(event.data)
    resetForm()
    useToast().add({ title: 'Задача успешно добавлена!' })
  }

  function resetForm() {
    state.value = {
      title: '',
      description: '',
      creatorEmail: '',
    }
  }
</script>

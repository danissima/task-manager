<template>
  <UForm
    ref="form"
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
  import type { FormSubmitEvent, Form } from '#ui/types'
  import { useUsersStore } from '~/store/users'
  import { useTasksStore, type Task } from '~/store/tasks'

  const { currentUser } = storeToRefs(useUsersStore())
  const { tasks } = storeToRefs(useTasksStore())

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

  type NewTaskState = Omit<Task, 'id' | 'isCompleted'>

  const form = ref<Form<null>>()
  const state = ref<NewTaskState>({
    title: '',
    description: '',
    creatorEmail: '',
  })

  function handleSubmit(event: FormSubmitEvent<Schema>) {
    if (!form.value) return

    const lastExistingTaskId = tasks.value.length
      ? tasks.value[tasks.value.length - 1].id
      : 1

    tasks.value.push({
      ...event.data,
      id: lastExistingTaskId + 1,
      isCompleted: false,
    })

    resetForm()
  }

  function resetForm() {
    state.value = {
      title: '',
      description: '',
      creatorEmail: '',
    }
  }
</script>

<template>
  <UForm
    v-if="isEditing"
    :state="state"
    @submit="handleSubmit"
  >
    <TaskCardContent
      v-model:formState="state"
      :info="info"
      :is-editing="isEditing"
    />
  </UForm>

  <TaskCardContent
    v-else
    :info="info"
    :is-editing="isEditing"
    @editing-change="isEditing = $event"
  />
</template>

<script lang="ts" setup>
  import { boolean, object, string, type InferType } from 'yup'
  import type { FormSubmitEvent } from '#ui/types'
  import {
    useTasksStore,
    type Task,
    type TaskEditingState,
  } from '~/store/tasks'

  interface Props {
    info: Task
  }

  const props = defineProps<Props>()

  const schema = object({
    description: string().default(''),
    isCompleted: boolean().default(props.info.isCompleted),
  })

  type Schema = InferType<typeof schema>

  const { editTask } = useTasksStore()

  const state = ref<TaskEditingState>({
    description: props.info.description,
    isCompleted: props.info.isCompleted,
  })

  const isEditing = ref<boolean>(false)

  function handleSubmit(event: FormSubmitEvent<Schema>) {
    editTask(props.info.id, event.data)
    isEditing.value = false
  }
</script>

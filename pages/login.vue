<template>
  <main class="main">
    <section class="login">
      <AppContainer>
        <UForm
          ref="form"
          :state="state"
          :schema="schema"
          class="form"
          @submit="handleSubmit"
        >
          <UFormGroup
            required
            label="Почта"
            name="email"
          >
            <UInput
              v-model="state.email"
              placeholder="me@example.com"
              autocomplete="email"
            />
          </UFormGroup>

          <UFormGroup
            required
            label="Пароль"
            name="password"
          >
            <UInput
              v-model="state.password"
              type="password"
              autocomplete="current-password"
              placeholder="12345"
            />
          </UFormGroup>

          <UButton
            class="login__submit"
            block
            type="submit"
          >
            Войти
          </UButton>
        </UForm>
      </AppContainer>
    </section>
  </main>
</template>

<script lang="ts" setup>
  import { object, string, type InferType } from 'yup'
  import type { FormSubmitEvent, Form } from '#ui/types'
  import { useUsersStore } from '~/store/users'

  useHead({
    title: 'Вход',
  })

  definePageMeta({
    middleware: ['logged-in'],
  })

  const schema = object({
    email: string().email('Неверная почта').required('Обязательное поле'),
    password: string().required('Обязательное поле'),
  })

  type Schema = InferType<typeof schema>

  interface LoginState {
    email: string
    password: string
  }

  const { users, usersEmails, login } = useUsersStore()

  const form = ref<Form<null>>()
  const state = ref<LoginState>({
    email: '',
    password: '',
  })

  function handleSubmit(event: FormSubmitEvent<Schema>) {
    if (!form.value) return

    /* существует ли юзер */
    const userIndex = usersEmails.indexOf(event.data.email)

    if (userIndex === -1) {
      form.value.setErrors([
        {
          message: 'Пользователь не найден',
          path: 'email',
        },
      ])

      return
    }

    /* верный ли пароль */
    const isPasswordCorrect = users[userIndex].password === event.data.password

    if (!isPasswordCorrect) {
      form.value.setErrors([
        {
          message: 'Неверный пароль',
          path: 'password',
        },
      ])

      return
    }

    login(users[userIndex])
  }
</script>

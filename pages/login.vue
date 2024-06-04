<template>
  <section class="login">
    <AppContainer>
      <UForm
        ref="form"
        :state="state"
        :schema="schema"
        class="login__form"
        @submit="handleSubmit"
      >
        <UFormGroup
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

  const usersStore = useUsersStore()
  const { users } = usersStore
  const { currentUser } = storeToRefs(usersStore)

  const form = ref<Form<null>>()
  const state = ref<LoginState>({
    email: '',
    password: '',
  })

  function handleSubmit(event: FormSubmitEvent<Schema>) {
    if (!form.value) return

    /* существует ли юзер */
    const userIndex = users.map(user => user.email).indexOf(event.data.email)

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

    currentUser.value = users[userIndex]
    useRouter().push('/')
  }
</script>

<style lang="scss">
  .login {
    &__form {
      max-width: 512px;
      margin: 0 auto;
    }

    /* отступ между элементами формы */
    &__form > * + * {
      margin-top: toRem(16);
    }
  }
</style>

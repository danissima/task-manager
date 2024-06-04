<template>
  <section class="login">
    <AppContainer>
      <UForm
        :state="state"
        :schema="schema"
        class="login__form"
        @submit.prevent="handleSubmit"
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
            placeholder="123456"
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
  import type { FormSubmitEvent } from '#ui/types'

  useHead({
    title: 'Вход',
  })

  interface LoginState {
    email: string
    password: string
  }

  const schema = object({
    email: string().email('Неверная почта').required('Обязательное поле'),
    password: string().required('Обязательное поле'),
  })

  type Schema = InferType<typeof schema>

  const state = ref<LoginState>({
    email: '',
    password: '',
  })

  function handleSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
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

import { useUsersStore } from '~/store/users'

export default defineNuxtRouteMiddleware(() => {
  const { isLogged } = useUsersStore()

  if (!isLogged) {
    return navigateTo('/login')
  }
})

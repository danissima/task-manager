import { useUsersStore } from '~/store/users'

export default defineNuxtRouteMiddleware(() => {
  const { currentUser } = useUsersStore()

  if (currentUser === null) {
    return navigateTo('/login')
  }
})

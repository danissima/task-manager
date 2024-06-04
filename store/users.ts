import { defineStore } from 'pinia'

interface User {
  email: string
  password: string
  role: 'admin' | 'user'
}

interface UsersStore {
  users: User[]
}

export const useUsersStore = defineStore('users', {
  state: (): UsersStore => {
    return {
      users: [
        {
          email: 'user@user.com',
          password: '12345',
          role: 'user',
        },
        {
          email: 'admin@admin.com',
          password: '67890',
          role: 'admin',
        },
      ],
    }
  },
})

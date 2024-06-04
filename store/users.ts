import { defineStore } from 'pinia'

interface User {
  email: string
  password: string
  role: 'admin' | 'user'
}

interface UsersStore {
  users: User[]
  currentUser: User | null
}

export const useUsersStore = defineStore('users', {
  state: (): UsersStore => {
    return {
      currentUser: null,
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

  getters: {
    usersEmails(): string[] {
      return this.users.map(user => user.email)
    },
  },
})

import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  creatorEmail: string
  description: string
  isCompleted: boolean
}

interface TasksStore {
  tasks: Task[]
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksStore => {
    return {
      tasks: [
        {
          id: 1,
          title: 'Выполнить тестовое',
          creatorEmail: 'admin@admin.com',
          description: 'Успешно выполнить тестовое задание и похвалить себя',
          isCompleted: true,
        },
        {
          id: 2,
          title: 'Пройти собеседование',
          creatorEmail: 'admin@admin.com',
          description: 'Успешно пройти собеседование и начать работать',
          isCompleted: false,
        },
        {
          id: 3,
          title: 'Погулять с кошкой',
          creatorEmail: 'admin@admin.com',
          description: 'Выйти на прогулку с кошкой в 18:00',
          isCompleted: false,
        },
      ],
    }
  },
})

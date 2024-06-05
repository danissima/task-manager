import { defineStore } from 'pinia'

export interface TasksFilters {
  searchString: string
  creator: 'anyone' | string
  isCompleted: 'maybe' | boolean
  isSortAscending: boolean
}

export type TaskEditingState = Pick<Task, 'isCompleted' | 'description'>

export interface Task {
  id: number
  title: string
  creatorEmail: string
  description: string
  isCompleted: boolean
}

interface TasksStore {
  tasks: Task[]
  filters: TasksFilters
  pagination: {
    currentPage: number
    tasksPerPage: number
    totalTasks: number
  }
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
        {
          id: 4,
          title: 'Убраться в комнате',
          creatorEmail: 'user@user.com',
          description: 'Сделать уборку в комнате',
          isCompleted: false,
        },
      ],

      filters: {
        searchString: '',
        creator: 'anyone',
        isCompleted: 'maybe',
        isSortAscending: true,
      },

      pagination: {
        currentPage: 1,
        tasksPerPage: 3,
        totalTasks: 4,
      },
    }
  },

  getters: {
    filteredTasks(): Task[] {
      let result: Task[] = this.tasks.map(task => Object.assign({}, task))

      /* поиск по названию */
      if (this.filters.searchString.trim().length > 0) {
        result = result.filter(task => {
          const regex = new RegExp(this.filters.searchString, 'i')
          return regex.test(task.title)
        })
      }

      /* фильтр по email */
      if (this.filters.creator !== 'anyone') {
        result = result.filter(task => {
          return task.creatorEmail === this.filters.creator
        })
      }

      /* фильтр по статусу */
      if (this.filters.isCompleted !== 'maybe') {
        result = result.filter(task => {
          return task.isCompleted === this.filters.isCompleted
        })
      }

      /* если количество задач изменилось */
      /* возвращаемся на первую страницу */
      if (this.pagination.totalTasks !== result.length) {
        this.pagination.currentPage = 1
      }

      /* обновляем количество после фильтрации */
      this.pagination.totalTasks = result.length

      /* сортировка по id */
      if (this.filters.isSortAscending) {
        result.sort((a, b) => a.id - b.id)
      } else {
        result.sort((a, b) => b.id - a.id)
      }

      /* пагинация */
      const startIndex =
        (this.pagination.currentPage - 1) * this.pagination.tasksPerPage
      const endIndex = startIndex + this.pagination.tasksPerPage

      return result.slice(startIndex, endIndex)
    },
  },

  actions: {
    // addTask(newTask: Task) {

    // }
    editTask(id: Task['id'], newData: TaskEditingState) {
      const taskIndex = this.tasks.map(task => task.id).indexOf(id)
      const taskToEdit = this.tasks[taskIndex]

      this.tasks[taskIndex] = {
        ...taskToEdit,
        ...newData,
      }
    },
  },
})

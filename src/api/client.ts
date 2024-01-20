import axios from 'axios'

import Todo from '../models/Todo.ts'

const BASE_URL = 'http://localhost:3000'

const client = axios.create({
  baseURL: BASE_URL
})

export const getTodos = async (): Promise<Todo[]> =>
  client.get<Todo[]>('/todos')
    .then((response) => response.data)

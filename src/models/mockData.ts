import TodoTask from './TodoTask.ts'

const mockData: TodoTask[] = [
  {
    id: '1',
    title: 'Write markup',
    isDone: true,
    creationTime: '2023-09-25T08:23:00.000Z',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Make components',
    isDone: true,
    creationTime: '2023-09-27T00:43:00.000Z',
    priority: 'Mid'
  },
  {
    id: '3',
    title: 'Write code',
    isDone: false,
    creationTime: '2023-12-20T14:56:00.000Z',
    priority: 'Low'
  },
  {
    id: '4',
    title: 'Make code review',
    isDone: false,
    creationTime: '2023-12-25T10:10:00.000Z',
    priority: 'High'
  },
  {
    id: '5',
    title: 'Make code refactoring',
    isDone: false,
    creationTime: '2023-12-29T18:17:00.000Z',
    priority: 'Mid'
  },
  {
    id: '6',
    title: 'Finish the project',
    isDone: false,
    creationTime: '2024-01-03T19:48:00.000Z',
    priority: 'Low'
  },
  {
    id: '7',
    title: 'Write to Kishor',
    isDone: true,
    creationTime: '2024-01-04T20:19:00.000Z',
    priority: 'High'
  },
  {
    id: '8',
    title: 'Make refactoring again',
    isDone: false,
    creationTime: '2024-01-05T21:21:00.000Z',
    priority: 'Mid'
  }
]

export default mockData

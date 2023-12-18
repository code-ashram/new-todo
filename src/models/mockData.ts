import TodoTask from './TodoTask.ts'

const mockData: TodoTask[] = [
  {
    id: '1',
    title: 'Write markup',
    isDone: true,
    creationTime: '2023-09-25',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Make components',
    isDone: true,
    creationTime: '2023-09-27',
    priority: 'Mid'
  },
  {
    id: '3',
    title: 'Write code',
    isDone: false,
    creationTime: '2023-11-10',
    priority: 'Low'
  },
  {
    id: '4',
    title: 'Make code review',
    isDone: false,
    creationTime: '2023-11-20',
    priority: 'High'
  },
  {
    id: '5',
    title: 'Make code refactoring',
    isDone: false,
    creationTime: '2023-11-29',
    priority: 'Mid'
  },
  {
    id: '6',
    title: 'Finish the project',
    isDone: false,
    creationTime: '2023-12-10',
    priority: 'Low'
  },
  {
    id: '7',
    title: 'Write to Kishor',
    isDone: true,
    creationTime: '2023-12-15',
    priority: 'High'
  },
  {
    id: '8',
    title: 'Make refactoring again',
    isDone: false,
    creationTime: '2023-12-17',
    priority: 'Mid'
  }
]

export default mockData

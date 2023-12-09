import TodoTask from './TodoTask.ts'

const mockData: TodoTask[] = [
  {
    id: '1',
    title: 'Write markup',
    isDone: true,
    creationTime: '2023-11-25'
  },
  {
    id: '2',
    title: 'Make components',
    isDone: true,
    creationTime: '2023-11-27'
  },
  {
    id: '3',
    title: 'Write code',
    isDone: false,
    creationTime: '2023-11-30'
  },
  {
    id: '4',
    title: 'Make code review',
    isDone: false,
    creationTime: '2023-12-05'
  },
  {
    id: '5',
    title: 'Make code refactoring',
    isDone: false,
    creationTime: '2023-12-07'
  },
  {
    id: '6',
    title: 'Finish the project',
    isDone: false,
    creationTime: '2023-12-09'
  }
]

export default mockData

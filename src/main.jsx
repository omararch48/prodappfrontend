import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import TodoPage from '@/todo/pages/todoPage/TodoPage.jsx'
import TodosPage from '@/todo/pages/todosPage/TodosPage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoPage />,
  },
  // {
  //   path: '/todos',
  //   element: <TodosPage />,
  // },
  // {
  //   path: '/todo',
  //   element: <TodoPage />,
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)

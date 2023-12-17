import { 
    PlusIcon,
    ArrowLeftCircleIcon,
    FolderArrowDownIcon
} from '@heroicons/react/24/outline'
import './TodoFooter.css'
import { useState } from 'react'


export default function TodoFooter({ tasks, setTasks }) {
    const [ message, setMessage ] = useState('')
    const [ importantTask, setImportantTask ] = useState(false)
    const [ newTask, setNewTask ] = useState({
        position: null,
        task: '',
        description: '',
        complete: false,
        active: false,
        important: false,
    })

    const setTaskName = (event) => {
        setNewTask({ ...newTask, task: event.target.value })
    }

    const setTaskImportant = (event) => {
        setImportantTask(event.target.checked)
        const taskAux = { ...newTask, important: event.target.checked }
        setNewTask(taskAux)
    }

    const pushNewTask = () => {
        if (newTask.task.trim() === '') {
            setMessage('Ingresa una tarea con nombre no vacío')
            return
        }
        setMessage('')
        const newListTasks = [ ...tasks ]
        newListTasks.push({ ...newTask, position: tasks.length })
        setTasks(newListTasks)
        setNewTask({
            position: null,
            task: '',
            description: '',
            complete: false,
            active: false,
            important: false,
        })
        setImportantTask(false)
    }

    return <>
        <div className="todo-footer-controls">
            {
                message !== ''
                    ? <span className="todo-footer-message">{ message }</span>
                    : ''
            }
            <input
                type="text"
                placeholder='Nueva tarea'
                value={ newTask.task }
                onInput={ setTaskName }
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        pushNewTask()
                    }
                }}
            />
            <fieldset>
                <label htmlFor="important-selector">Marcar como importante</label>
                <input type="checkbox" id="important-selector" value={ importantTask } onChange={ setTaskImportant } />
            </fieldset>
            <button onClick={ pushNewTask } className='add-task-button'>Agregar tarea<PlusIcon className='h-6 w-6'/></button>
            <button className='save-tasks-button'>Guardar cambios<FolderArrowDownIcon className='h-6 w-6'/></button>
            <button className='undo-tasks-button'>Deshacer cambios<ArrowLeftCircleIcon className='h-6 w-6'/></button>
        </div>
    </>
}
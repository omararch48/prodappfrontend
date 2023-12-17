import { 
    TrashIcon,
    PencilSquareIcon,
    PencilIcon,
    PlusIcon,
    Bars3Icon
} from '@heroicons/react/24/outline'
import TodoTask from '../todoTask/TodoTask'
import TodoFooter from '../todoFooter/TodoFooter'
import './Todo.css'
import { useState, useEffect } from 'react'


function TasksList({ tasks, setTasks, showTasks }) {

    const handleTasks = ( taskObject ) => {
        let tasksUpdate = [ ...tasks ]
        if (taskObject.action === 'status') {
            tasksUpdate = tasks.map(task => {
                if (task.position === taskObject.position) {
                    return {
                        ...task,
                        complete: !task.complete
                    }
                }
                return task
            })
        } else if (taskObject.action === 'up') {
            let pos1 = taskObject.position - 1
            let pos2 = taskObject.position
            let taskAux = { ...tasksUpdate[pos1] }
            tasksUpdate[pos1] = { ...tasksUpdate[pos2] }
            tasksUpdate[pos2] = { ...taskAux }
            tasksUpdate[pos1].position = pos1
            tasksUpdate[pos2].position = pos2
        } else if (taskObject.action === 'down') {
            let pos1 = taskObject.position
            let pos2 = taskObject.position + 1
            let taskAux = { ...tasksUpdate[pos1] }
            tasksUpdate[pos1] = { ...tasksUpdate[pos2] }
            tasksUpdate[pos2] = { ...taskAux }
            tasksUpdate[pos1].position = pos1
            tasksUpdate[pos2].position = pos2
        } else if (taskObject.action === 'edit') {
            tasksUpdate = tasks.map(task => {
                if (task.position === taskObject.position) {
                    return {
                        ...task,
                        active: !task.active
                    }
                }
                return {
                    ...task,
                    active: false
                }
            })
        } else if (taskObject.action === 'delete') {
            tasksUpdate = tasksUpdate.filter(task => task.position !== taskObject.position)
            tasksUpdate = tasksUpdate.map((task, index) => {
                return { ...task, position: index }
            })
        } else if (taskObject.action === 'task') {
            tasksUpdate[taskObject.position].task = taskObject.task
        }  else if (taskObject.action === 'description') {
            tasksUpdate[taskObject.position].description = taskObject.description
        } else if (taskObject.action === 'important') {
            tasksUpdate = tasksUpdate.map(task => {
                if (task.position === taskObject.position) {
                    return { ...task, important: !task.important }
                } else {
                    return task
                }
            })
        }
        setTasks( [ ...tasksUpdate ] )
    }

    const getTodoListClasses = (show) => {
        let classCss = 'todo-list'
        if (show === 'complete') {
            classCss += ' show-complete'
        } else if (show === 'incomplete') {
            classCss += ' show-incomplete'
        }
        return classCss
    }

    return <>
        <div className={ getTodoListClasses(showTasks) }>
            {
                tasks.map((itemTask, index) => (
                    <TodoTask
                        key={ index }
                        { ...itemTask }
                        handleTasks={ handleTasks }
                        isFinal={ itemTask.position !== tasks.length - 1 }
                    />
                ))
            }
        </div>
    </>
}


export default function Todo({ name }) {
    const [ nameTodo, setNameTodo ] = useState(name)
    const [ counter, setCounter ] = useState(0)
    const [ showTasks, setShowTasks ] = useState('all')
    const [ boolEditName, setBoolEditName ] = useState(false)
    const [ tasks, setTasks ] = useState([])

    const handleNameTodo = (event) => {
        setNameTodo(event.target.value)
    }

    const handleBoolEditName = () => {
        setBoolEditName(value => !value)
    }

    const setCounters = () => {
        let completed = 0
        tasks.forEach(task => {
            if (task.complete) {
                completed++
            }
        })
        setCounter(completed)
    }

    const setCompleteTasks = () => {
        if (showTasks === 'complete') {
            setShowTasks('all')
            return
        }
        setShowTasks('complete')
    }

    const setIncompleteTasks = () => {
        if (showTasks === 'incomplete') {
            setShowTasks('all')
            return
        }
        setShowTasks('incomplete')
    }

    const setAllTasks = () => {
        setShowTasks('all')
    }

    useEffect(() => {
        setCounters()
    }, [ tasks ])

    return <>
        <div className="todo-component">
            <div className="todo-name">
                {
                    !boolEditName
                        ? <h2
                            onDoubleClick={ handleBoolEditName }
                            onTouchStart={ handleBoolEditName }
                        >
                            { nameTodo }
                        </h2>
                        : <input
                            type="text"
                            value={ nameTodo }
                            onChange={ handleNameTodo }
                            onBlur={ handleBoolEditName }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleBoolEditName()
                                }
                            }}
                        />
                }
                <div className="icon-title" onClick={ handleBoolEditName }>
                    {
                        !boolEditName
                            ? 'Editar'
                            : 'Listo'
                    }
                    <PencilSquareIcon className='h-4 w-4' />
                </div>
            </div>
            <div className="todo-header">
                <div className={ showTasks === 'incomplete' ? 'info incomplete active' : 'info incomplete' } onClick={ setIncompleteTasks }>
                    <span className="number">{ tasks.length - counter }</span>
                    <span className="text">sin completar</span>
                </div>
                <div className={ showTasks === 'complete' ? 'info complete active' : 'info complete' } onClick={ setCompleteTasks }>
                    <span className="number">{ counter }</span>
                    <span className="text">{ counter === 1 ? 'completada' : 'completadas' }</span>
                </div>
            </div>
            <nav className="todo-controls">
                <button className='add'>Agregar tarea<PlusIcon className="h-6 w-6" /></button>
                <button onClick={ setAllTasks } className='info'>Ver todas <Bars3Icon className="h-6 w-6" /></button>
                <button className='remove'>Eliminar lista<TrashIcon className="h-6 w-6" /></button>
                {/* <button className='edit'>Editar <PencilIcon className="h-6 w-6" /></button> */}
            </nav>
            <TasksList tasks={ tasks } setTasks={ setTasks } showTasks={ showTasks } />
        </div>
        <TodoFooter tasks={ tasks } setTasks={ setTasks } />
    </>
}
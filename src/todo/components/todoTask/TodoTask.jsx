import {
    XMarkIcon,
    CheckIcon,
    TrashIcon,
    PencilSquareIcon,
    ArrowUturnLeftIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ExclamationCircleIcon,
    StopCircleIcon
} from '@heroicons/react/24/outline'
import './TodoTask.css'


export default function TodoTask({ position, task, description, complete, important, active, handleTasks, isFinal }) {

    const statusTask = () => {
        handleTasks({
            action: 'status',
            position
        })
    }

    const editTask = () => {
        handleTasks({
            action: 'edit',
            position
        })
    }

    const changuePosition = (action) => {
        handleTasks({
            action,
            position
        })
    }

    const deleteTask = () => {
        handleTasks({
            action: 'delete',
            position
        })
    }

    const changeTaskName = (event) => {
        handleTasks({
            action: 'task',
            position,
            task: event.target.value
        })
    }

    const changeTaskDescription = (event) => {
        handleTasks({
            action: 'description',
            position,
            description: event.target.value
        })
    }

    const importantTask = () => {
        handleTasks({
            action: 'important',
            position
        })
    }

    const getTaskClasses = (complete, important) => {
        let classCss = 'todo-task'
        if (complete) {
            classCss += ' complete'
        } else {
            classCss += ' incomplete'
        }
        if (important) {
            classCss += ' important'
        }
        return classCss
    }

    return <>
        {/* <div className={ important ? 'todo-task important' : 'todo-task' }> */}
        <div className={ getTaskClasses(complete, important) }>
            <div className={ active ? 'task-detail active' : 'task-detail' }>
                <div className="task-values">
                    <fieldset>
                        <label htmlFor="">Tarea:</label>
                        <input type="text" value={ task } onChange={ changeTaskName } />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Descripción:</label>
                        <textarea name="" id="" cols="30" rows="4" value={ description } onChange={ changeTaskDescription } ></textarea>
                    </fieldset>
                </div>
                <div className="task-controls">
                    { 
                        complete
                            ? <button onClick={ statusTask } className='bg-emerald-600 hover:bg-emerald-700'>Completada<CheckIcon className='h-4 w-4' /></button>
                            : <button onClick={ statusTask } className='bg-red-600 hover:bg-red-700'>Incompleta<XMarkIcon className='h-4 w-4' /></button>
                    }
                    <button onClick={ deleteTask } className='bg-rose-600 hover:bg-rose-700'>Eliminar<TrashIcon className='h-4 w-4' /></button>
                    { 
                        important
                            ? <button onClick={ importantTask } className='bg-orange-600 hover:bg-orange-700'>Importante<ExclamationCircleIcon className='h-4 w-4' /></button>
                            : <button onClick={ importantTask } className='bg-yellow-600 hover:bg-yellow-700'>Normal<StopCircleIcon className='h-4 w-4' /></button>
                    }
                    { 
                        position !== 0
                            ? <button onClick={ () => changuePosition('up') } className='bg-cyan-600 hover:bg-cyan-700'>Subir<ChevronUpIcon className='h-4 w-4' /></button>
                            : <button disabled className='bg-cyan-600 opacity-80'>Subir<ChevronUpIcon className='h-4 w-4' /></button>
                    }
                    { 
                        isFinal
                            ? <button onClick={ () => changuePosition('down') } className='bg-purple-600 hover:bg-purple-700'>Bajar<ChevronDownIcon className='h-4 w-4' /></button>
                            : <button disabled className='bg-purple-600 opacity-80'>Bajar<ChevronDownIcon className='h-4 w-4' /></button>
                    }
                    <button onClick={ editTask } className='bg-teal-600 hover:bg-teal-700'>Regresar<ArrowUturnLeftIcon className='h-4 w-4' /></button>
                </div>
            </div>
            <div className="task-info">
                <h4 className={ complete ? 'complete' : '' }>{ task }</h4>
            </div>
            <div className="task-buttons">
                { 
                    complete
                        ? <button onClick={ statusTask } className='complete'><CheckIcon className='w-6 h-6 text-white' /><span>marcar como incompleta</span></button>
                        : <button onClick={ statusTask } className='incomplete'><XMarkIcon className='w-6 h-6 text-white' /><span>marcar como completa</span></button>
                }
                <button onClick={ editTask } className='edit'><PencilSquareIcon className='w-6 h-6 text-white' /><span>editar</span></button>
                <button onClick={ deleteTask } className='delete'><TrashIcon className='w-6 h-6 text-white' /><span>eliminar</span></button>
            </div>
        </div>
    </>
}
import Todo from "@/todo/components/todo/Todo.jsx"
import './TodoPage.css'


export default function TodoPage() {
    return <>
        <div className="todo-page">
            <Todo name={ 'Todo' } />
        </div>
    </>
}
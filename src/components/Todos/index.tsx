import { AxiosError, AxiosResponse } from "axios"
import { ChangeEvent, useCallback, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { delTodo, getTodos, postTodo, updateTodo } from "../../services/todos"
import { Todo } from "../../types/todo"

export function Todos() {

    // selected state
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>()

    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const { data: response, isLoading, error } = useQuery<any, Error>('todos', getTodos)

    // Mutations

    // create mutation
    const createTodoMutation = useMutation<AxiosResponse, Error, Todo>(postTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })

    // update mutation
    const updateTodoMutation = useMutation<AxiosResponse, Error, Todo>(updateTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })

    // delete mutation
    const deleteMutation = useMutation<AxiosResponse, Error, any>(delTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })

    // Handlers

    // create todo
    const handleCreateTodo = () => {
        createTodoMutation.mutate({
            completed: false,
            title: 'Teste marcio',
        })
    }

    // onchange todo form
    const handleOnChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSelectedTodo({
            ...selectedTodo,
            title: value
        })
    }

    // save todo
    const handleSaveTodo = () => {
        if (selectedTodo) {
            updateTodoMutation.mutate(selectedTodo)
            setSelectedTodo(null)
        }
    }

    // delete todo
    const handleDeleteTodo = useCallback(({ id }: Todo) => {
        if (id) {
            deleteMutation.mutate(id)
        }
    }, [])

    // loading
    if (isLoading) return <p>Loading...</p>

    // error
    if (error) return <p>'An error has occurred: ' {error.message}</p>

    return (
        <div>
            <ul>
                {response?.data?.map((todo: Todo) => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => handleDeleteTodo(todo)}>DELETE</button>
                        <button onClick={() => setSelectedTodo(todo)}>EDIT</button>
                    </li>
                ))}
            </ul>

            <button
                onClick={handleCreateTodo}
            >
                Add Todo
            </button>

            {selectedTodo && <div>
                <>
                    <input
                        name="title"
                        value={selectedTodo.title}
                        onChange={handleOnChangeTodo}
                    />
                    <button onClick={handleSaveTodo}>SAVE</button>
                </>
            </div>}
        </div>
    )
}
import { AxiosResponse } from "axios"
import { ChangeEvent, useCallback, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { delTodo, getTodos, postTodo, updateTodo } from "../../services/todos"

import { Todo } from "../../types/todo"

import { TodoListForm, TodosList, TodosListAction, TodosListButton, TodosListInput, TodosListItem } from "./styles"

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
        setSelectedTodo({
            title: ""
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

            selectedTodo?.id
                ? updateTodoMutation.mutate(selectedTodo)
                : createTodoMutation.mutate(selectedTodo)
        }

        setSelectedTodo(null)
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
            <TodosList>
                {response?.data?.map((todo: Todo) => (
                    <TodosListItem key={todo.id}>
                        {todo.title}
                        <TodosListAction>
                            <TodosListButton onClick={() => handleDeleteTodo(todo)}>DELETE</TodosListButton>
                            <TodosListButton onClick={() => setSelectedTodo(todo)}>EDIT</TodosListButton>
                        </TodosListAction>
                    </TodosListItem>
                ))}
            </TodosList>

            <TodosListButton
                onClick={handleCreateTodo}
            >
                Add Todo
            </TodosListButton>

            {selectedTodo && <TodoListForm
                noValidate
            >
                <>
                    <TodosListInput
                        name="title"
                        value={selectedTodo.title}
                        onChange={handleOnChangeTodo}
                    />
                    <TodosListButton onClick={handleSaveTodo}>SAVE</TodosListButton>
                </>
            </TodoListForm>}
        </div>
    )
}
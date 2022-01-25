import { api } from "./api"

export function getTodos() {
    return api.get('/todos')
}

export function showTodo(id: number) {
    return api.get(`/todos/${id}`)
}

export function postTodo(todo: any) {
    return api.post('/todos', todo)
}

export function delTodo(id: number) {
    return api.delete(`/todos/${id}`)
}

export function updateTodo(todo: any) {
    return api.put(`/todos/${todo.id}`, todo)
}
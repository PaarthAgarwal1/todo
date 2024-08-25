import './App.css'
import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import Navbar from './NavBar';

interface TodoAppProps {}

const TodoApp: React.FC<TodoAppProps> = () => {
  const todoList = localStorage.getItem('todos');
  const todoData: string[] = todoList ? JSON.parse(todoList) : [];

  const todoCompleteList = localStorage.getItem('completeTodos');
  const todoCompleteData: string[] = todoCompleteList ? JSON.parse(todoCompleteList) : [];

  const [todos, setTodos] = useState<string[]>(todoData);
  const [completedTodos, setCompletedTodos] = useState<string[]>(todoCompleteData);
  const [emptyTodo, setEmptyTodo] = useState<boolean>(todoData.length === 0);
  const [emptyCompletedTodo, setEmptyCompletedTodo] = useState<boolean>(true);

  useEffect(() => {
    setEmptyCompletedTodo(completedTodos.length === 0);
  }, [completedTodos]);

  useEffect(() => {
    setEmptyTodo(todos.length === 0);
  }, [todos]);

  function addList(item: string) {
    const newTodos = [...todos, item];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  function markAsDone(item: string) {
    const newTodos = todos.filter(todo => todo !== item);
    setTodos(newTodos);
    const newCompletedTodos = [...completedTodos, item];
    setCompletedTodos(newCompletedTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    localStorage.setItem('completeTodos', JSON.stringify(newCompletedTodos));
  }

  function markAsTodo(item: string) {
    const newCompletedTodos = completedTodos.filter(todo => todo !== item);
    setCompletedTodos(newCompletedTodos);
    const newTodos = [...todos, item];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    localStorage.setItem('completeTodos', JSON.stringify(newCompletedTodos));
  }

  function deleteItems(item: string) {
    const newTodos = todos.filter(todo => todo !== item);
    const newCompletedTodos = completedTodos.filter(todo => todo !== item);
    setTodos(newTodos);
    setCompletedTodos(newCompletedTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    localStorage.setItem('completeTodos', JSON.stringify(newCompletedTodos));
  }

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div >
      <Navbar />
      <div className="px-4 lg:px-24 pt-10">
        <div className="flex flex-col lg:flex-row justify-between">
          <h1 className="text-3xl font-bold pb-4">Things to get done</h1>
          <button onClick={handleRefresh} className="bg-yellow-500 text-sm font-semibold text-white px-4 w-24 py-2 lg:my-2 rounded shadow mr-4 focus:outline-none focus:ring-0">Refresh</button>
        </div>

        <h2 className="text-lg font-semibold my-4">Todo List</h2>
        {emptyTodo ? (
          <p className="text-gray-400">No todo here!</p>
        ) : (
          <ul>
            {todos.map((item, index) => (
              <TodoList key={index} item={item} onTaskChange={markAsDone} checked={false} deleteItems={deleteItems} />
            ))}
          </ul>
        )}

        <TodoInput addList={addList} />

        <h2 className="text-lg font-semibold my-4">Completed Tasks</h2>
        {emptyCompletedTodo ? (
          <p className="text-gray-400">No completed task here!</p>
        ) : (
          <ul>
            {completedTodos.map((item, index) => (
              <TodoList key={index} item={item} onTaskChange={markAsTodo} checked={true} deleteItems={deleteItems} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoApp;

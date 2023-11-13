import React from "react";

import { useEffect, useState } from "react";

import { List, ListItem } from "@chakra-ui/react";

import { ITodo } from "../../interface/todo.interface";

export default function TodoList() {
    const [inputText, setInputText] = useState<string>("");

    const [todos, setTodos] = useState<ITodo[] | undefined>([]);

    console.log(todos)

    useEffect(() => {
        const fromStorage = localStorage.getItem("todos")

        const localTodos = fromStorage ? JSON.parse(fromStorage) : [];

        // @ts-ignore
        setTodos(localTodos);

        console.log(todos)
    }, []);

  const handleAddTodo = () => {
    const newTodo: ITodo = {
      id: Date.now().toString(),
      text: inputText,
    };

    const newTodos = [...todos, newTodo]

    setTodos(newTodos);
    setInputText("");

    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const handleRemoveTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)

    setTodos(newTodos);

    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

    return (
        <div style={{
          paddingBottom: "25px",
        }}>
            <h1>Todo List</h1>

            <List>
                {
                    todos.map((todo) => (
                      <ListItem key={todo.id}>
                        <div>
                          {todo.text}

                          <button onClick={() => handleRemoveTodo(todo.id)}>
                            Удалить
                          </button>
                        </div>
                      </ListItem>
                    ))
                }
            </List>

            <div
              style={{
                paddingTop: "15px"
              }}
            />

            <input
              type="text"
              placeholder="Добавить задачу"
              onChange={ (e) => {
                  setInputText(e.target.value)
              }}
            >
            </input>
          <button
            style={{
              paddingLeft: "15px"
            }}
            onClick={ () => handleAddTodo() }>
            Добавить
          </button>
        </div>
    )
}
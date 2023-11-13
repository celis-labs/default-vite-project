import React from "react";

import { useEffect, useState } from "react";

import { List, ListItem } from "@chakra-ui/react";

import { ITodo } from "../../interface/todo.interface";

export default function TodoList() {
    const [inputText, setInputText] = useState<string>("");

    const [todos, setTodos] = useState<ITodo[] | undefined>([]);

    useEffect(() => {
        const fromStorage = localStorage.getItem("todos")

        const localTodos = fromStorage ? JSON.parse(fromStorage) : [];

        setTodos(localTodos);
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

  const handleSort = () => {
    const sortedTodos = [...todos].sort((a, b) => a.text.localeCompare(b.text))

    setTodos(sortedTodos);

    localStorage.setItem("todos", JSON.stringify(sortedTodos))
  }

  const handleFilter = (filterText: string) => {
    const filteredTodos = todos.filter((todo: ITodo) => 
      todo.text.toLowerCase().includes(filterText.toLowerCase())
    )

    setTodos(filteredTodos);

    localStorage.setItem("todos", JSON.stringify(filteredTodos))
  }

  const handleExport = () => {
    const packedTodos = JSON.stringify(todos)

    const blob = new Blob([packedTodos], { type: "application/json" })

    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "todos.json"

    link.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const rawImportedTodos = e.target?.result as string

          const importedTodos = JSON.parse(rawImportedTodos)

          setTodos(importedTodos)

          localStorage.setItem("todos", rawImportedTodos)
        } catch(e) {
          console.error(e)
        }
      }

      reader.readAsText(file)
    }
  }

    return (
        <div style={{
          paddingBottom: "25px",
        }}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "15px"
              }}
            >
              Todo List
            </h1>

            <div style={{
              display: "grid",
              paddingBottom: "15px",
            }}>
              <button
                style={{
                  gridColumn: 1
                }}
                onClick={ handleSort }
              >
                Сортировать
              </button>

              <input
                type="text"
                style={{
                  border: "1px solid #000000",
                  borderRadius: "6px",
                  gridColumn: 2,
                  width: "135px"
                }}
                placeholder="Фильтр по имени"
                onChange={ (e: HTMLInputElement) => {
                  handleFilter(e.target.value)
              }}
              >
              </input>
            </div>

            <List>
                {
                    todos.map((todo: ITodo) => (
                      <ListItem key={todo.id}>
                        <div>
                          {todo.text}

                          <button 
                            style={{
                              backgroundColor: "#ffca00",
                              borderRadius: "5px",
                              width: "75px",
                              marginLeft: "10px",
                              marginBottom: "10px"
                            }}
                            onClick={() => handleRemoveTodo(todo.id)}
                          >
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
              style={{
                border: "1px solid #000000",
                borderRadius: "6px"
              }}
              onChange={ (e: HTMLInputElement) => {
                  setInputText(e.target.value)
              }}
            >
            </input>

          <button
            style={{
              marginLeft: "15px",
              backgroundColor: "#ffca00",
              borderRadius: "5px",
              width: "90px"
            }}
            onClick={ () => handleAddTodo() }>
              Добавить
          </button>

          <div
            style={{
              marginTop: "10px"
            }}
          >
            <button
              style={{
                backgroundColor: "#ffca00",
                width: "75px"
              }}
              onClick={ handleExport }
            >
              Экспорт
            </button>

            <br/>

            <a>Импорт</a>
            <input
              type="file"
              accept=".json"
              placeholder="Импорт"
              onChange={ handleImport }
            />
          </div>
        </div>
    )
}
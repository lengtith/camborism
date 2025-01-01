"use client";

import React, { useState, useEffect } from "react";
import { Check, Info, X } from "@phosphor-icons/react/dist/ssr";
import { Button, ButtonGroup, Input, Tooltip } from "@nextui-org/react";
import { displayToast } from "@/src/lib/toast";

type TodoProp = {
  id: string;
  text: string;
  status: string;
};

export function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [updateText, setUpdateText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todos, setTodos] = useState<TodoProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [todoStatus, setTodoStatus] = useState<string>("All");
  const [editMode, setEditMode] = useState<string | null>(null);

  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/todos");
        const data = await res.json();

        if (data.data.length > 0) {
          setTodos(data.data);
        }
      } catch (error: any) {
        displayToast(`${error.message}`, "error");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Count todos based on the selected status
  const filterTodos = todos.filter((todo) => {
    if (todoStatus === "All") return true;
    return todo.status === todoStatus;
  });

  ////////////////////////////////
  //     Create new todo
  ///////////////////////////////
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press to trigger submission when Enter key is pressed
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      await handleSubmit();
    }
  };

  // Submit the data to json-server
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newTodo = {
        id: crypto.randomUUID(),
        text: inputValue,
        status: "Active"
      };
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      });

      if (response.ok) {
        setTodos((prev) => [...prev, newTodo]);
        setInputValue(""); // Clear input field
        displayToast("Todo created successfully", "success");
      } else {
        displayToast("Todo created failed", "error");
      }
    } catch (error: any) {
      displayToast(`Todo created failed, ${error.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  ////////////////////////////////
  //     Delete todo
  ///////////////////////////////
  const handleDeleteTodo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          console.log("Index: " + todoIndex);
          const newTodos = [...todos];
          newTodos.splice(todoIndex, 1);
          setTodos(newTodos);
        }
        displayToast(`Remove todo successfully`, "success");
      }

      if (!res.ok) {
        displayToast(`Remove todo failed`, "error");
      }
    } catch (error: any) {
      displayToast(`Remove todo failed, ${error.message}`, "error");
    }
  };

  const handleDeleteAllTodos = async () => {
    try {
      const deletePromise = todos.map((todo) =>
        fetch(`http://localhost:3000/api/todos/${todo.id}`, {
          method: "DELETE"
        })
      );
      await Promise.all(deletePromise)
        .then(() => {
          setTodos([]);
          displayToast("Todos deleted successfully", "success");
        })
        .catch(() => displayToast("Removing todo failed", "error"));
    } catch (error: any) {
      displayToast(`Remove todo failed, ${error.message}`, "error");
    }
  };

  ////////////////////////////////
  //     Update todo
  ///////////////////////////////
  // Handle todo change status
  const hadleStatusTodos = (status: string) => {
    setTodoStatus(status);
  };

  const handleCompleteTodo = async (id: string, status: string) => {
    const updateStatus = status === "Active" ? "Complete" : "Active";
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updateStatus })
      });

      if (res.ok) {
        const updateTodo = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, status: updateStatus };
          }
          return todo;
        });

        setTodos(updateTodo);

        displayToast(`Todo completed`, "success");
      } else {
        displayToast(`Todo failed to complete`, "error");
      }
    } catch (error: any) {
      displayToast(`Todo failed to complete on ${error.message}`, "error");
    }
  };

  // Handle update input change
  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateText(e.target.value);
  };

  // Handle user double click on todo text
  const handleDoubleClick = (todoId: string, text: string) => {
    setEditMode(todoId);
    setUpdateText(text);
  };

  // Handle user click on enter key press
  const handleUpdateKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === "Enter") {
      updateTodoText(todoId, updateText); // Call a function to update the todo
      setEditMode(null); // Exit edit mode
    }
  };

  // Logic to update the todo text in your state or backend
  const updateTodoText = async (id: string, updateText: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: updateText })
      });

      if (res.ok) {
        const updateTodo = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text: updateText };
          }
          return todo;
        });

        setTodos(updateTodo);

        displayToast(`Todo completed`, "success");
      } else {
        displayToast(`Todo failed to complete`, "error");
      }
    } catch (error: any) {
      displayToast(`Todo failed to complete on ${error.message}`, "error");
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-65px)]">
      <section className="m-auto w-full max-w-5xl px-6 py-20">
        <div className="w-full flex justify-center items-center gap-4">
          <Input
            name="todo"
            className="new-todo max-w-xs"
            placeholder="What needs to be done?"
            type="text"
            variant="bordered"
            size="lg"
            value={inputValue}
            disabled={isSubmitting}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Usage:</div>
                <div className="text-tiny">
                  Enter to create a new todo <br />
                  Double-click to edit a todo
                </div>
              </div>
            }
          >
            <Button isIconOnly radius="full" aria-label="info" variant="light">
              <Info size={20} />
            </Button>
          </Tooltip>
        </div>
      </section>

      {/* Todo List */}
      <section className="m-auto w-full max-w-5xl px-6 py-20">
        <div className="todos flex flex-col gap-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filterTodos?.map((todo: any) => (
              <div
                key={todo?.id}
                className="animate-appearance-in flex justify-between items-center p-3 bg-white/15 rounded-lg"
              >
                <div className="flex gap-3 items-center">
                  <Button
                    isIconOnly
                    variant="bordered"
                    className="toggle p-0"
                    radius="full"
                    onPress={() => handleCompleteTodo(todo.id, todo.status)}
                  >
                    {todo && todo?.status === "Complete" ? (
                      <Check size={20} />
                    ) : (
                      ""
                    )}
                  </Button>
                  {editMode === todo.id ? (
                    <input
                      type="text"
                      value={updateText}
                      onChange={handleUpdateInputChange}
                      onKeyDown={(e) => handleUpdateKeyDown(e, todo.id)}
                      autoFocus
                      className="border p-1 rounded"
                    />
                  ) : (
                    <p
                      onDoubleClick={() =>
                        handleDoubleClick(todo.id, todo?.text)
                      }
                    >
                      {todo?.text}
                    </p>
                  )}
                </div>
                <Button
                  isIconOnly
                  variant="bordered"
                  className="todo-delete p-0"
                  radius="full"
                  onPress={() => handleDeleteTodo(todo.id)} // Delete todo
                >
                  <X size={20} />
                </Button>
              </div>
            ))
          )}
        </div>

        {!loading && todos.length === 0 && (
          <div className="flex w-full justify-start">
            <p>No todos found 😓</p>
          </div>
        )}

        <div className="todo-actions flex justify-between items-center mt-5 transition-transform duration-300 ease-in-out">
          <p>
            {filterTodos.length} item
            {todos.length !== 1 && "s"} left!
          </p>
          <ButtonGroup variant="bordered" className="todo-status">
            <Button onPress={() => setTodoStatus("All")}>All</Button>
            <Button onPress={() => hadleStatusTodos("Active")}>Active</Button>
            <Button onPress={() => hadleStatusTodos("Complete")}>
              Completed
            </Button>
          </ButtonGroup>
          <Button variant="light" color="danger" onPress={handleDeleteAllTodos}>
            Clear all
          </Button>
        </div>
      </section>
    </main>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todo.scss";
import {
  MdDelete,
  MdEditSquare,
  MdDoneAll,
  MdOutlineChangeCircle,
} from "react-icons/md";

function Todo() {
  const [apiTodos, setApiTodos] = useState([]);
  const [createdTodoValue, setCreatedTodoValue] = useState({
    title: "",
  });
  const [editableTodoValue, setEditableTodoValue] = useState({
    title: "",
    myId: "",
  });

  // * Todos Api Url
  const todosApiUrlNoLimit = "https://jsonplaceholder.typicode.com/todos";
  const todosApiUrl = `https://jsonplaceholder.typicode.com/todos?_limit=50`;

  // * Delete Todo
  const handleDeleteTodo = (deletedTodo) => {
    axios.delete(`${todosApiUrlNoLimit}/${deletedTodo.id}`).then(({ data }) => {
      const filterArray = apiTodos.filter((todo) => todo.id !== deletedTodo.id);
      toast.error(`tou Have Deleted "${deletedTodo.title}"`);
      setApiTodos(filterArray);
    });
  };

  // * Edit Mode
  const handleEditMode = (todo) => {
    setEditableTodoValue({ title: todo.title, myId: todo.id });
  };

  // * Update Todo
  const handleUpdateTodo = (newValue, todoId) => {
    console.log(todoId);
    axios
      .put(`${todosApiUrlNoLimit}/${todoId}`, {
        title: newValue.title,
      })
      .then(({ data: todo }) => {
        console.log(todo);
        const prevArray = [...apiTodos];
        prevArray.map((oldTodo) => {
          if (oldTodo.id === todoId) {
            toast.warning(`You Have Changed "${oldTodo.title}" Task`);
            oldTodo.title = todo.title;
          }
        });
        setApiTodos(prevArray);
        toast.success(`Task "${todo.title}" Successfully Updated`);
      });
    setEditableTodoValue({
      title: "",
      myId: "",
    });
  };

  // * POST request to add ne todo
  const handleAddNewTodo = (todo) => {
    createdTodoValue.title !== "" &&
      axios
        .post(todosApiUrl, {
          title: todo,
          completed: false,
        })
        .then(({ data }) => {
          setApiTodos((prev) => [...prev, data]);
          data && toast.success(`Task "${todo}" Successfully Added`);
        });
    setCreatedTodoValue({ title: "" });
    createdTodoValue.title === "" && toast.dark("Enter The Task To Add");
  };

  // * Completed Todos

  const handleCompletedTodo = (todoId) => {
    const todosArr = [...apiTodos];
    todosArr.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
        todo.completed &&
          toast.success(`Task "${todo.title}" Successfully Completed`);
      }
    });

    setApiTodos(todosArr);
  };

  // *Fetch todos Api
  useEffect(() => {
    axios(`${todosApiUrl}`)
      .then(({ data: todos }) => {
        const allTodos = todos;
        allTodos.map((todo) => {
          // * make all Todos uncompleted to check after with clicking on button
          todo.completed = false;
        });
        setApiTodos(allTodos);
      })
      .catch((error) => {
        toast.dark(`${error.response.status} ${error.response.statusText}`);
      });
  }, []);

  return (
    <div className="todos__container">
      <section className="newtodo__creator">
        <input
          type="text"
          className="newtodo__creator--input"
          placeholder="...TODO"
          value={createdTodoValue.title}
          onChange={(e) => {
            const inputValue = e.target.value;
            setCreatedTodoValue(inputValue);
          }}
        />
        <button onClick={() => handleAddNewTodo(createdTodoValue)}>
          Create
        </button>
      </section>
      <section className="todos__display">
        <ul className="todos__display--list">
          {apiTodos.map((todo, index) => {
            return editableTodoValue.myId === todo.id ? (
              <div className="update__todo--constainer">
                <input
                  type="text"
                  value={editableTodoValue.title}
                  onChange={(e) => {
                    const trgetValue = e.target.value;
                    setEditableTodoValue({
                      ...editableTodoValue,
                      title: trgetValue,
                    });
                  }}
                />
                <button
                  onClick={() => handleUpdateTodo(editableTodoValue, todo.id)}
                >
                  <MdOutlineChangeCircle className="update" />
                </button>
              </div>
            ) : (
              <li className="todo__content" key={todo.id}>
                <span
                  style={{
                    textDecoration: todo.completed && "line-through",
                    color: todo.completed && "green",
                  }}
                >
                  {todo.title}
                </span>
                <div className="todo__content--btns">
                  <button onClick={() => handleCompletedTodo(todo.id)}>
                    <MdDoneAll className="completed" />
                  </button>
                  <button onClick={() => handleEditMode(todo)}>
                    <MdEditSquare className="edit" />
                  </button>
                  <button onClick={() => handleDeleteTodo(todo)}>
                    <MdDelete className="delete" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Todo;

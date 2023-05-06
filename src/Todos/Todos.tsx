import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import reducer, { todosState } from "../Reducer/reducer";
import {
  addNewTodo,
  changeTodo,
  completedTodo,
  deleteTodo,
  editMode,
  editingDone,
  saveTodosData,
} from "../Reducer/actions";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { Add, DeleteForever, Done, DoneAll, Edit } from "@mui/icons-material";

const Todos = () => {
  const [inputValue, setInpitValue] = useState("");
  const [state, dispatch] = useReducer(reducer, todosState);

  const handleAddTodo = async () => {
    const { data } = await axios.post("https://dummyjson.com/todos/add", {
      todo: inputValue,
      userId: 5,
      completed: false,
    });
    dispatch(addNewTodo(data));
    setInpitValue("");
  };

  const handleDeleteTodo = async (todoToDelete: Todo) => {
    const { data } = await axios.delete(
      `https://dummyjson.com/todos/${todoToDelete.id}`
    );
    dispatch(deleteTodo(data));
  };

  const handleEditMode = (editableTodo: Todo) => {
    dispatch(editMode(editableTodo));
  };

  const handleChangeTodo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(changeTodo(event.target.value));
  };

  const handleDoneEditing = async (editiedTodo: EditableTodo) => {
    const { data } = await axios.put(
      `https://dummyjson.com/todos/${editiedTodo.id}`,
      {
        todo: state.editableTodo.todo,
      }
    );
    dispatch(editingDone(data));
  };

  useEffect(() => {
    const getTodos = async () => {
      const {
        data: { todos },
      } = await axios.get("https://dummyjson.com/todos");
      dispatch(saveTodosData(todos));
    };
    getTodos();
  }, []);

  return (
    <Box>
      <Box>
        <TextField
          id=""
          label=""
          value={inputValue}
          onChange={(e) => setInpitValue(e.target.value)}
        />
        <Button variant="contained" color="inherit" onClick={handleAddTodo}>
          <Add /> Add
        </Button>
      </Box>
      <Box>
        <List>
          {state.todos.map((todo) => {
            return state.editableTodo.id === todo.id ? (
              <Box
                key={todo.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  style={{
                    width: "80%",
                  }}
                  label="Editable Todo"
                  value={state.editableTodo.todo}
                  onChange={(event) => handleChangeTodo(event)}
                />
                <Button
                  sx={{
                    padding: "12px",
                  }}
                  variant="contained"
                  onClick={() => handleDoneEditing(state.editableTodo)}
                >
                  Done
                  <DoneAll />
                </Button>
              </Box>
            ) : (
              <ListItem key={todo.id}>
                <ListItemText
                  style={{
                    textDecoration: todo.completed && "line-through",
                  }}
                >
                  {todo.todo}
                </ListItemText>
                <List sx={{ display: "flex" }}>
                  <ListItemButton onClick={() => handleDeleteTodo(todo)}>
                    <DeleteForever />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleEditMode(todo)}>
                    <Edit />
                  </ListItemButton>
                  <ListItemButton onClick={() => dispatch(completedTodo(todo))}>
                    <Done />
                  </ListItemButton>
                </List>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Todos;

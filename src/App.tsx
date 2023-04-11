import React from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  List,
  ListItem,
  Typography,
  ButtonGroup,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import "./App.scss";

type TodoObject = {
  id: number;
  todo: string;
  userId: number;
  completed: boolean;
};

type EditInput = {
  todo: string;
  id: string | number;
};

type MyComponentState = {
  inputValue: string;
  todoList: TodoObject[];
  editInputValue: EditInput;
};

class ToDoList extends React.Component<{}, MyComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: "",
      todoList: [],
      editInputValue: {
        id: "",
        todo: "",
      },
    };
  }

  // * KeyPress
  onKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  // * add Input Value To List
  // onAddBtn = () => {
  //   const prevArray = this.state.todoList;
  //   this.setState({
  //     inputValue: "",
  //     todoList: [
  //       ...prevArray,
  //       {
  //         todo: this.state.inputValue,
  //         id: prevArray.length + 1,
  //         completed: false,
  //       },
  //     ],
  //   });
  // };

  // * Fetch Todos API

  async componentDidMount(): Promise<void> {
    const {
      data: { todos },
    } = await axios(`https://dummyjson.com/todos`);
    todos.map((todo: TodoObject) => (todo.completed = false));
    this.setState({
      todoList: todos,
    });
  }

  // * Delete Request

  onDeleteRequest = async (id: number) => {
    const { data } = await axios.delete(`https://dummyjson.com/todos/${id}`);
    this.setState({
      todoList: this.state.todoList.filter((todo) => todo.id !== id),
    });
  };

  // * Post Reauest

  onAddBtn = async (inputValue: string) => {
    try {
      const { data } = await axios.post("https://dummyjson.com/todos/add", {
        todo: inputValue,
        completed: false,
        userId: 10,
      });
      this.setState({
        inputValue: "",
        todoList: [...this.state.todoList, data],
      });
    } catch (error) {
      console.log(error);
    }
  };

  //  * Done Todos

  coompletedTodos = (id: number) => {
    const todosArray = this.state.todoList;
    todosArray.map((todo: TodoObject) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    this.setState({
      todoList: todosArray,
    });
  };

  // * Edit Todo
  editMode = (myTodo: TodoObject) => {
    const { editInputValue } = this.state;
    this.setState({
      editInputValue: { ...editInputValue, todo: myTodo.todo, id: myTodo.id },
    });
  };

  onEditDone = async (id: number, editInputValue: EditInput) => {
    const editedTodo = { todo: editInputValue.todo, id: editInputValue.id };
    const { data } = await axios.put(`https://dummyjson.com/todos/${id}`, {
      editedTodo,
    });
    const todosPrevArray = [...this.state.todoList];
    todosPrevArray.map((todo) => {
      if (todo.id === id) {
        todo.todo = editInputValue.todo;
      }
    });
    this.setState({
      todoList: todosPrevArray,
      editInputValue: {
        todo: "",
        id: "",
      },
    });
  };
  render(): React.ReactNode {
    const { inputValue, todoList, editInputValue } = this.state;
    return (
      <Box className="main_container">
        <Box>
          <TextField
            id="item"
            label="ToDo"
            value={inputValue}
            onChange={this.onKeyPress}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => this.onAddBtn(inputValue)}
          >
            Add
          </Button>
        </Box>
        <Box>
          <List className="todo__item">
            {todoList.map((todo: TodoObject) => {
              return this.state.editInputValue.id === todo.id ? (
                <Box position="static" key={todo.todo}>
                  <TextField
                    type="text"
                    id="input"
                    label="EditMode"
                    value={editInputValue.todo}
                    onChange={(e) => {
                      this.setState({
                        editInputValue: {
                          ...editInputValue,
                          todo: e.target.value,
                        },
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => this.onEditDone(todo.id, editInputValue)}
                  >
                    Done Edit
                  </Button>
                </Box>
              ) : (
                <ListItem key={todo.id}>
                  <Typography
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                    variant="h6"
                    color="initial"
                  >
                    {todo.todo}
                  </Typography>
                  <ButtonGroup variant="text" color="info">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => this.onDeleteRequest(todo.id)}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => this.coompletedTodos(todo.id)}
                    >
                      <DoneAllIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        return this.editMode(todo);
                      }}
                    >
                      <Edit />
                    </Button>
                  </ButtonGroup>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    );
  }
}

export default ToDoList;

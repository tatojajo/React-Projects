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

type stateType = {
  inputValue: string;
  todoList: [
    {
      id: number;
      todo: string;
      completed: boolean;
    }
  ];
};

class ToDoList extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: "",
      todoList: [],
      editInputValue: {
        todo: "",
        id: "",
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
    todos.map((todo) => (todo.completed = false));
    this.setState({
      todoList: todos,
    });
  }

  // * Delete Request

  onDeleteRequest = async (id) => {
    const { data } = await axios.delete(`https://dummyjson.com/todos/${id}`);
    this.setState({
      todoList: this.state.todoList.filter((todo) => todo.id !== id),
    });
  };

  // * Post Reauest

  onAddBtn = async (inputValue) => {
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

  coompletedTodos = (id) => {
    const todosArray = this.state.todoList;
    console.log(todosArray);
    todosArray.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    this.setState({
      todoList: todosArray,
    });
  };

  // * Edit Todo

  // onEditTodo = async (id, editInputValue) => {
  //   const resp = await axios.put(`https://dummyjson.com/todos/${id}`, {
  //     todo: editInputValue,
  //   });
  // };

  editMode = (myTodo) => {
    const { editInputValue } = this.state;
    this.setState({
      editInpitValue: { ...editInputValue, todo: myTodo.todo, id: todo.id },
    });
    console.log(editInputValue);
  };

  render(): React.ReactNode {
    const { inputValue, todoList, editInputValue } = this.state;
    return (
      <Box>
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
          <List>
            {todoList.map((todo) => {
              return this.state.editInputValue.id === todo.id ? (
                // alert('hello')
                <div>
                  <input
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
                  <Button variant="contained" color="warning">
                    Done Edit
                  </Button>
                </div>
              ) : (
                <ListItem key={todo.id}>
                  <Typography
                    style={{
                      textDecoration: todo.completed && "line-through",
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
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => this.coompletedTodos(todo.id)}
                    >
                      Done
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        return this.editMode(todo);
                      }}
                    >
                      Edit
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

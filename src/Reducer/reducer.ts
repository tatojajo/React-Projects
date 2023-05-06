import {
  ADD_NEW_TODO,
  DELETE_TODO,
  SAVE_TODOS_DATA,
  EDIT_MODE,
  UPDATE_TODO,
  DONE_EDITING,
  COMPLETED_TODO,
} from "./actions";
import { TODOS_ACTIONS } from "./types";

export const todosState: InitialState = {
  todos: [],
  editableTodo: {
    id: 0,
    todo: "",
  },
};

const reducer = (state = todosState, action: TODOS_ACTIONS) => {
  switch (action.type) {
    case SAVE_TODOS_DATA:
      return { ...state, todos: action.todos };
    case ADD_NEW_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case DELETE_TODO:
      const prevTodos = state.todos;
      const afterDelete = prevTodos.filter(
        (todo) => todo.id !== action.todo.id
      );
      return {
        ...state,
        todos: afterDelete,
      };
    case EDIT_MODE:
      return {
        ...state,
        editableTodo: {
          ...state.editableTodo,
          id: action.todo.id,
          todo: action.todo.todo,
        },
      };
    case UPDATE_TODO:
      return {
        ...state,
        editableTodo: { ...state.editableTodo, todo: action.event },
      };
    case DONE_EDITING:
      const todosBiforeEdit = [...state.todos];
      const updatedTodos = todosBiforeEdit.map((todo) => {
        if (todo.id === state.editableTodo.id) {
          return { ...todo, todo: state.editableTodo.todo, completed: false };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        editableTodo: { id: 0, todo: "" },
      };
    case COMPLETED_TODO:
      const todos = [...state.todos];
      const completedTodos = todos.map((todo) => {
        if (todo.id === action.todo.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { ...state, todos: completedTodos };
    default:
      return state;
  }
};

export default reducer;

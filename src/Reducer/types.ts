import {
  ADD_NEW_TODO,
  COMPLETED_TODO,
  DELETE_TODO,
  DONE_EDITING,
  EDIT_MODE,
  SAVE_TODOS_DATA,
  UPDATE_TODO,
} from "./actions";

export type SAVE_TODOS_DATA_ACTION = {
  type: typeof SAVE_TODOS_DATA;
  todos: Todo[];
};

export type ADD_NEW_TODO_ACTION = {
  type: typeof ADD_NEW_TODO;
  todo: Todo;
};

export type DELETE_TODO_ACTION = {
  type: typeof DELETE_TODO;
  todo: Todo;
};

export type EDIT_MODE_ACTION = {
  type: typeof EDIT_MODE;
  todo: Todo;
};

export type UPDATE_TODO_ACTION = {
  type: typeof UPDATE_TODO;
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
};

export type DONE_EDITING_ACTION = {
  type: typeof DONE_EDITING;
  editedTodo: EditableTodo;
};

export type COMPELTED_TODO_ACTION = {
  type: typeof COMPLETED_TODO
  todo: Todo
}

export type TODOS_ACTIONS =
  | SAVE_TODOS_DATA_ACTION
  | ADD_NEW_TODO_ACTION
  | DELETE_TODO_ACTION
  | EDIT_MODE_ACTION
  | UPDATE_TODO_ACTION
  | DONE_EDITING_ACTION 
  | COMPELTED_TODO_ACTION;

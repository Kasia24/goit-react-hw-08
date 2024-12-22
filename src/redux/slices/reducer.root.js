import { combineReducers } from "redux";
import { tasksReducer } from "./slices/tasks";
import { filtersReducer } from "./slices/filter";
import { userReducer } from "./slices/user";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
  user: userReducer,
});

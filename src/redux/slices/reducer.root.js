import { combineReducers } from "redux";
import { tasksReducer } from "../operations/tasks";
import { filtersReducer } from "../constants/filter";
import { userReducer } from "../operations/user";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
  user: userReducer,
});

import { userReducer } from "../redux/slices/user";

// Inicjalizacja rootReducer z Redux Toolkit
const rootReducer = {
  user: userReducer,
};

export default rootReducer;

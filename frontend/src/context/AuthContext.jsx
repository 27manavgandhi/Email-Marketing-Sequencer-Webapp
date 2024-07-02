import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("futureBlinkUser")) || null,
  token: localStorage.getItem("futureBlinkUserToken") || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user, token) => {
    localStorage.setItem("futureBlinkUser", JSON.stringify(user));
    localStorage.setItem("futureBlinkToken", token);
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    localStorage.removeItem("futureBlinkUser");
    localStorage.removeItem("futureBlinkToken");

    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    // Check if a token exists in local storage (e.g., on page refresh)
    const token = localStorage.getItem("futureBlinkToken");
    const user = JSON.parse(localStorage.getItem("futureBlinkUser"));

    if (token && user) {
      login(user, token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

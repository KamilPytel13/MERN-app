import { createContext } from "react/cjs/react.production.min";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
});
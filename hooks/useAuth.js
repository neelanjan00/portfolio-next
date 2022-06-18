import { createContext, useContext, useState } from "react";
import { AuthService } from "../services/auth";

const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const signInWithEmailAndPassword = async (email, password) => {
        const { user, error } = await AuthService.signInWithEmailAndPassword(email, password);

        setUser(user ?? null);
        setError(error ?? "");
    };

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    };

    return <authContext.Provider value={{ user, error, signInWithEmailAndPassword, logout, setUser }} {...props} />
}
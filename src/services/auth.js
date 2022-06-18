import { auth } from "./firebase"

export const AuthService = {
    signInWithEmailAndPassword: async (email, password) => {
        try {
            const userCredentials = await auth.signInWithEmailAndPassword(email, password);
            return {
                user: userCredentials.user
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    logout: async () => {
        await auth.signOut();
    }
}
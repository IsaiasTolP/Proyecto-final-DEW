import { type FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, type Auth, type UserCredential } from "firebase/auth";

export class UserAuth {
    private auth: Auth;

    constructor(app: FirebaseApp) {
        this.auth = getAuth(app);
    }

    async login(email: string, password: string): Promise<UserCredential> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error en el inicio de sesión", error);
            throw error;
        }
    }

    async register(email: string, password: string): Promise<UserCredential> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error en el registro", error);
            throw error;
        }
    }

    async signOut() {
        try {
            await signOut(this.auth);
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    }
}

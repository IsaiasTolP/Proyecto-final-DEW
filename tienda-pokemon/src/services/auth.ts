import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, type Auth, type UserCredential } from "firebase/auth";

export default class UserAuth {
    private app: FirebaseApp;
    private auth: Auth;

    constructor(firebaseConfig: any) {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
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
}

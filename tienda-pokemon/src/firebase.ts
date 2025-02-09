import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    CollectionReference,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User, type Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDL4RiEmTV8XrHu2ZwjJ1KMCFWNBk1AnFc",
    authDomain: "compra-pokemon-74d5c.firebaseapp.com",
    projectId: "compra-pokemon-74d5c",
    storageBucket: "compra-pokemon-74d5c.appspot.com",
    messagingSenderId: "556323015298",
    appId: "1:556323015298:web:0e3df360e1ecbe5d79c29b"
};

const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);
const auth: Auth = getAuth(app);

export interface PurchaseData {
    userId: string;
    createdAt: Date;
    pokemonIds: number[];
    pokemons: string[];
    total: number;
}

class ConnectToFirebase {
    public auth: Auth;
    private buyCollection: CollectionReference<PurchaseData>;
    constructor() {
        this.buyCollection = collection(db, "compras") as CollectionReference<PurchaseData>;
        this.auth = auth;
    }

    // Método para obtener el usuario actual
    getCurrentUser (): User | null {
        return this.auth.currentUser ;
    }

    // Método para verificar el estado de autenticación
    onAuthStateChanged(callback: (user: User | null) => void) {
        return onAuthStateChanged(this.auth, callback);
    }

    // Crea una compra con los datos especificados.
    // Se añadirá el ID del usuario actual..
    async createPurchase(data: PurchaseData): Promise<string> {
        const user = this.auth.currentUser;
        if (!user) {
            throw new Error("Usuario no autenticado");
        }
        try {
            const PurchaseData: PurchaseData = {
                ...data,
                userId: user.uid,
            };
            const docRef = await addDoc(this.buyCollection, PurchaseData);
            return docRef.id;
        } catch (e) {
            console.error("Error añadiendo documento: ", e);
            throw e;
        }
    }

    // Recupera todas las compras del usuario
    async readAllPurchases(): Promise<(PurchaseData & { id: string })[]> {
        const user = this.auth.currentUser;
        if (!user) {
            throw new Error("Usuario no autenticado");
        }

        try {
            const q = query(this.buyCollection, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const dataList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return dataList;
        } catch (e) {
            console.error("Error obteniendo documentos: ", e);
            throw e;
        }
    }
}

export {ConnectToFirebase, app, db, auth};
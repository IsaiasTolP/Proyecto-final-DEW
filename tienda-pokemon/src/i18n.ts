import { createI18n } from "vue-i18n";

const messages = {
    en: {
        logo: 'My Pokemon Store',
        goToLogin: 'Go to login',
        goToRegister: 'Go to register',
        logged: "¡You're logged in!",
        purchaseHistory: 'Purchase history',
        logout: 'Sign Out',
        stats: {
            attack: 'Attack',
            weight: 'Weight',
        },
        cart: {
            empty: 'Your cart is empty',
            addToCart: 'Add to cart',
            clearCart: 'Clear cart',
            buyItems: 'Buy',
        },
        history: {
            loadingMsg: 'Loading purchase history...',
            purchaseId: 'Purchase ID',
            date: 'Date',
            purchasedPokemons: 'Purchased Pokemons',
            total: 'Total price',
        }
    },
    es: {
        logo: 'Mi tienda de Pokemon',
        goToLogin: 'Ir a iniciar sesión',
        goToRegister: 'Ir a registrarse',
        logged: '¡Has iniciado sesión!',
        purchaseHistory: 'Historial de compras',
        logout: 'Cerrar sesión',
        stats: {
            attack: 'Ataque',
            weight: 'Peso',
        },
        cart: {
            empty: 'Tu carrito está vacío',
            addToCart: 'Añadir al carrito',
            clearCart: 'Vaciar carrito',
            buyItems: 'Comprar',
        },
        history: {
            loadingMsg: 'Cargando historial de compras...',
            purchaseId: 'ID de compra',
            date: 'Fecha',
            purchasedPokemons: 'Pokemons comprados',
            total: 'Precio total',
        }
    },
};

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
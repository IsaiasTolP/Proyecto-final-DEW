# Documento Técnico del Frontend: Tienda Pokémon

**Proyecto:** Tienda Pokémon  
**Tecnologías:** Vue 3, TypeScript, Tailwind CSS, PrimeVue, Firebase, i18n, vitest, entre otras.

---

## 1. Descripción General

Este documento técnico detalla las características y tecnologías utilizadas en el desarrollo del frontend de la aplicación web para la tienda Pokémon. Se utiliza **Vue 3** con **TypeScript** para garantizar un desarrollo estructurado, escalable y fácil de mantener. La interfaz es responsiva, atractiva y está optimizada tanto para dispositivos móviles como para escritorios mediante el uso de **Tailwind CSS** y **PrimeVue**.

---

## 2. Tecnologías y Herramientas Utilizadas

### 2.1. **Vue 3 con TypeScript**

La aplicación está construida con **Vue 3** y utiliza **TypeScript** para asegurar un código fuerte y con tipado, lo que permite detectar errores temprano. Se aprovechan los siguientes beneficios de Vue 3:

- **Composition API** para un desarrollo más modular y reutilizable.
- **SFC (Single File Components)** para una estructura de código limpia y bien organizada.

### 2.2. **Tailwind CSS y PrimeVue**

El diseño de la tienda es responsivo y atractivo, logrando una experiencia de usuario fluida en todos los dispositivos. Se utilizan dos tecnologías principales para el diseño:

- **Tailwind CSS**: Utilizado para la creación de un diseño altamente personalizable mediante clases utilitarias, permitiendo la creación rápida de interfaces sin necesidad de escribir CSS personalizado.
- **PrimeVue**: Se implementa para utilizar componentes predefinidos como botones, tablas, menús y más, facilitando la integración de elementos visuales profesionales y coherentes.

### 2.3. **Vue Router y Seguridad**

Se gestiona la navegación entre las diferentes vistas de la tienda mediante **Vue Router**, con las siguientes características:

- **Rutas protegidas**: El historial de compras, requiere autenticación mediante un **login seguro**.
- **Manejo de redirecciones**: Si un usuario no está autenticado y accede a una ruta protegida, es redirigido al login.

### 2.4. **Pinia para Manejo de Estados Globales**

El estado global de la aplicación se gestiona con **Pinia**, que es el sistema de gestión de estados recomendado en Vue 3.

- **Modularidad**: Los estados están organizados en módulos dentro de Pinia, facilitando el mantenimiento y escalabilidad del proyecto.
- **Reactividad**: El uso de Pinia asegura que todos los cambios en el estado se reflejen de manera reactiva en la interfaz.

### 2.5. **Eslint**

El proyecto utiliza **Eslint** para mantener un código limpio y consistente. Las reglas de estilo y calidad del código están definidas, lo que ayuda a prevenir errores comunes y garantiza que el código sea fácilmente legible y mantenible.

### 2.6. **Composables**

Se emplean **composables** para abstraer la lógica de negocio y hacerla reutilizable en diferentes partes de la aplicación.

### 2.7. **Firebase**

La base de datos de compras y usuarios está alojada en **Firebase**. Se utiliza para gestionar los datos de los usuarios (registro, login) y el historial de compras de la tienda.

- **Autenticación**: Implementación de Firebase Authentication para el registro y login de los usuarios.
- **Firestore**: Utilizado para almacenar información de las compras y el historial del usuario.

### 2.8. **Conexión a la API con Fetch**

La comunicación con la API para obtener productos se realiza mediante la función **fetch()** de JavaScript.

---

## 3. Patrones y Buenas Prácticas

### 3.1. **Modularidad y Componentes Reutilizables**

La estructura de la aplicación está diseñada para ser modular, utilizando **slots** en los componentes para aumentar su reutilización. Por ejemplo:

- **Slots**: Permiten personalizar componentes de forma flexible, pasando contenido dinámico.
- **Props y Emits**: Utilizamos estos mecanismos para comunicar componentes padre e hijo, pasando datos y acciones de manera eficiente.

### 3.2. **Filtrado de Búsqueda con Provide / Inject**

Para la implementación de filtros de búsqueda en el catálogo de productos, se hace uso de **Provide / Inject** en Vue. Esto permite que los componentes de búsqueda puedan acceder a los filtros y parámetros globales sin necesidad de pasar props directamente entre componentes.

### 3.3. **Directivas de Vue**

Se hace uso intensivo de directivas comunes de Vue como:

- **v-if**: Para mostrar u ocultar elementos según condiciones.
- **@click**: Para manejar eventos de clic de los usuarios.
- **v-for**: Para iterar sobre listas de productos y mostrar información dinámica.
- **v-model**: Para enlazar datos bidireccionales, como formularios de registro y login.

### 3.4. **Reactividad con `ref()`**

Se utiliza la función **`ref()`** para crear referencias reactivas a elementos del DOM y datos que cambian con el tiempo. Esto asegura que la UI siempre se mantenga actualizada de acuerdo con los cambios en el estado de la aplicación.

### 3.5. **Interfaces de TypeScript**

Se han creado **interfaces de TypeScript** para definir los tipos de datos de los usuarios, productos y compras, asegurando que el código se mantenga seguro y fácil de entender.

- Ejemplo:
  ```typescript
    interface PokemonData {
        name: string;
        id: number;
        stats: { base_stat: number }[];
        weight: number;
        sprites: {
            front_default: string;
            back_default: string;
        };
        types: { type: { name: string } }[]; // Array de tipos
    }
  ```

## 4. Internacionalización (i18n)
La tienda ofrece soporte tanto en inglés como en español mediante el uso de la librería i18n. Esto permite a los usuarios cambiar el idioma de la interfaz de forma dinámica sin recargar la página. Los textos clave (botones, títulos, descripciones) están gestionados en archivos de traducción.

## 5. Buenas Prácticas y Mantenimiento

### 5.1. Código Comentado y Reutilizable
Cada componente y función está adecuadamente comentado para facilitar la comprensión del código. El código está diseñado para ser reutilizable y fácilmente extensible en el futuro.

### 5.2. Pruebas Unitarias
Se ha implementado un fichero de tests unitarios por cada componente utilizando herramientas como Vitest o Vue Test Utils. Esto asegura que la aplicación sea robusta y que cualquier cambio o mejora no rompa funcionalidades existentes.
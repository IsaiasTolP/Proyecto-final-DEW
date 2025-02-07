// Definimos una interfaz para los datos que recibimos de la API
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

// Exportamos por defecto la clase Pokemon
export class Pokemon {
    name: string;
    id: number;
    attack: number;
    price: number;
    weight: number;
    pkm_front: string;
    pkm_back: string;
    pkm_type: { type: { name: string } }[];

    // Constructor que recibe como parámetro data que contiene los datos de los Pokemon que obtenemos desde la API
    constructor(data: PokemonData) {
        this.name = data.name; // Nombre del pokemon
        this.id = data.id; // Id del pokemon
        this.attack = data.stats[1].base_stat; // Asumiendo que el ataque está en la segunda posición
        this.price = 0; // Inicializamos el precio en 0
        this.weight = data.weight; // Peso del pokemon
        this.pkm_front = data.sprites.front_default; // Pokemon de frente
        this.pkm_back = data.sprites.back_default; // Pokemon de espaldas
        this.pkm_type = data.types; // Tipo del pokemon (Devuelve un array)
    }
}
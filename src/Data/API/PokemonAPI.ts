import { POKEMONAPI } from "@/Constant/ApiConstant";

export async function getPokemon(limit: number ,offset: number) {
    
    const response = await fetch(POKEMONAPI + `pokemon?limit=${limit}}&offset=${offset}`);
    const data = await response.json();
    return data.results;
}

export async function getPokemonByName(name: string) {
   try {
    const response = await fetch(POKEMONAPI + "pokemon/" + name);
    console.log(`${POKEMONAPI}pokemon/${name}`);
    const data = await response.json();
    console.log("data" + data);
    return data;
   } catch (error) {
    console.log("error rrrr" + error)
    return [];
   }
}
import { POKEMONAPI } from "@/Constant/ApiConstant";
import { PokemonAPIResponse, PokemonResult } from "@/Domain/Model/Pokedex";

export async function getPokemon(
  limit: number,
  offset: number
): Promise<PokemonAPIResponse> {
  try {
    const response = await fetch(
      POKEMONAPI + `pokemon?limit=${limit}}&offset=${offset}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon data");
  }
}

export async function getPokemonNextPage(
  url: string
): Promise<PokemonAPIResponse> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon data");
  }
}

export async function getPokemonByName(
  name: string,
  tempPokemonList: PokemonResult[]
): Promise<PokemonResult[]> {
  try {
    const response = await fetch(POKEMONAPI + "pokemon/" + name);
    const data = await response.json();
    const pokemonSerching: PokemonResult[] = [
      {
        name: data.name,
        url: data.sprites.front_default,
        id: data.id,
        urlIdividal: data.sprites.front_default,
      },
    ];
    return pokemonSerching;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon data");
  }
}

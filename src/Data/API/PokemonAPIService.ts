import { POKEMONAPI } from "@/Constant/ApiConstant";
import { PokemonAPIResponse, PokemonResult } from "@/Domain/Model/Pokedex";
import { PokemonSpeciesResponse } from "@/Domain/Model/PokemonSpecies";

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
): Promise<PokemonSpeciesResponse> {
  try {
    console.log("Test");
    const response = await fetch(POKEMONAPI + "pokemon-species/" + name);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch Pokemon data");
  }
}

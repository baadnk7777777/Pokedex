import { getPokemon } from "@/Data/API/PokemonAPIService";
import Pokedex from "./Presentation/Pokedex/Pokedex";
export default async function Home() {
  const pokemonResponse = await getPokemon(10, 0);
  return <Pokedex pokemonResponse={pokemonResponse} />;
}

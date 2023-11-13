import { getPokemon } from '@/Data/API/PokemonAPI'
import Pokedex from './Presentation/Pokedex/Pokedex'
import { useState } from 'react';

export default async function Home() {
  const pokemonList = await getPokemon(10,0);
  return (
    <Pokedex pokemonList={pokemonList}/>
  
  )
}

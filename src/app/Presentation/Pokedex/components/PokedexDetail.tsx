import React from "react";
import PokedexCard from "./PokedexCard";
import { PokemonResult } from "@/Domain/Model/Pokedex";

interface PokedexPageProps {
  pokemonList: any[];
  offset: string;
}

const PokedexDetail: React.FC<PokedexPageProps> = (props) => {
  return (
    <>
      {props.pokemonList.map((item: PokemonResult, index: any) => {
        const parts = item.url.split("/");
        const pokemonNumber = parts[parts.length - 2];
        return (
          <PokedexCard
            key={index}
            pokedexName={item.name}
            pokedexNunber={
      
              item.id == null
                ? pokemonNumber.length <= 3 ? String(Number(pokemonNumber)).padStart(3, "0") : pokemonNumber
                : String(Number(item.id)).padStart(3, "0")
           
            }
            pokedeximageUrl={
              item.urlIdividal == null
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(
                    Number(pokemonNumber)
                  )}.png`
                : item.urlIdividal
            }
          />
        );
      })}
    </>
  );
};

export default PokedexDetail;

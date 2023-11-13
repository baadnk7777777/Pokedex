"use client";
import React, { useEffect, useState } from "react";
import PokedexHeader from "./components/PokedexHeader";
import SearchInput from "./components/SearchInput";
import PokedexCard from "./components/PokedexCard";
import ButtonCustom from "@/app/components/ButtonCustom";
import { PokemonResult } from "@/Domain/Model/Pokedex";
import { GetServerSideProps } from "next";
import { getPokemon, getPokemonByName } from "@/Data/API/PokemonAPI";
import PokedexDetail from "./components/PokedexDetail";

interface PokedexPageProps {
  pokemonList: any;
}

export const ActionName = {
    NEXT: 'Next',
    PREV: 'Prev',
}

export default function Pokedex({ pokemonList }: { pokemonList: any[] }) {
  const [nextPokemonList, setNextPokemonList] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [searchName, setSearchName] = useState("");

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setNextPokemonList(pokemonList);
    setLoading(false);
  }, [pokemonList]);

  const fetchNextPokemonList = async () => {
    setLoading(true);
    const tempOffset = offset;
    setOffset(tempOffset + 10);
    const fetchNextPokemonList = await getPokemon(10, offset);
    setNextPokemonList(fetchNextPokemonList);
    setLoading(false);
  };

  const fetchPrevPokemonList = async () => {
    const tempOffset = offset - 10;
    if(tempOffset <= 0) return;
    setLoading(true);
    setOffset(tempOffset);
    const fetchPrevPokemonList = await getPokemon(10, offset);
    setNextPokemonList(fetchPrevPokemonList);
    setLoading(false);
  };

  const fetchPokemonListByName = async (name: string) => {
    setLoading(true);
    const data = {
        name: "pikachu",
        url: "",
      };
   
    const jsonData: string = JSON.stringify(data);
    const convertedList: any[] = JSON.parse(jsonData) as any[];
    console.log(nextPokemonList);
    console.log("convertedList"+ convertedList[0]);
    setNextPokemonList(convertedList);
    const fetchPokemonListByName = await getPokemonByName(name);
    console.log("fetchPokemonListByName" + fetchPokemonListByName.name);
    setLoading(false);
  }

  const handleButtonClick = async (action: string) => {
    console.log(action);
    if(action === ActionName.NEXT) {
        fetchNextPokemonList();
    }else if(action === ActionName.PREV) {
        fetchPrevPokemonList();
    }
  }

  const handleSearchFilter = (value: string) => {
    fetchPokemonListByName(value);
  };

  return (
    <div className="min-h-screen bg-white">
      <PokedexHeader />
      <div className="flex justify-center">
        <p className=" text-2xl font-semibold mt-2">Pokemon List</p>
      </div>
      <div className="flex justify-center mt-4">
        <SearchInput onChange={handleSearchFilter}/>
      </div>
      <div className="flex justify-center">
        <div className="w-[1024px] flex justify-center">
          <div className=" grid grid-cols-2 md:grid-cols-5 gap-y-3 gap-4 mt-4 ">
            {!isLoading && <PokedexDetail pokemonList={nextPokemonList} offset={offset.toString()} />}
            {nextPokemonList.length == 0 && nextPokemonList != undefined &&   <div className="w-[1024px] text-center"> Sorry, we couldn&rsquo;t find </div>}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <ButtonCustom buttonName={ActionName.PREV} onClick={handleButtonClick}/>
        <ButtonCustom buttonName={ActionName.NEXT} onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const [pokemonRes] = await Promise.all([getPokemon(10,0)]);
  const [pokemonList] = await Promise.all([pokemonRes.json()]);
  return {
    props: {
      pokemonList: pokemonList.data,
    },
  };
};

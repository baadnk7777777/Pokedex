"use client";
import React, { useEffect, useState } from "react";
import PokedexHeader from "./components/PokedexHeader";
import SearchInput from "./components/SearchInput";
import ButtonCustom from "@/app/components/ButtonCustom";
import { PokemonAPIResponse, PokemonResult } from "@/Domain/Model/Pokedex";
import {
  getPokemon,
  getPokemonByName,
  getPokemonNextPage,
} from "@/Data/API/PokemonAPIService";
import PokedexDetail from "./components/PokedexDetail";

export const ActionName = {
  NEXT: "Next",
  PREV: "Prev",
};

export default function Pokedex({
  pokemonResponse,
}: {
  pokemonResponse: PokemonAPIResponse;
}) {
  const [nextPokemonList, setNextPokemonList] = useState<PokemonResult[]>([]);
  const [nextPokemonListTemp, setNextPokemonListTemp] = useState<
    PokemonResult[]
  >([]);
  const [pageNext, setPageNext] = useState<string | null>();
  const [pagePrev, setPagePrev] = useState<string | null>();
  const [isLoading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  useEffect(() => {
    setNextPokemonList(pokemonResponse.results);
    setNextPokemonListTemp(pokemonResponse.results);
    setPageNext(pokemonResponse.next);
    setPagePrev(pokemonResponse.previous);
    setLoading(false);
  }, [pokemonResponse]);

  const fetchNextPokemonList = async (page: string) => {
    setLoading(true);
    const fetchNextPokemonList = await getPokemonNextPage(page);
    setPageNext(fetchNextPokemonList.next);
    setPagePrev(fetchNextPokemonList.previous);
    setNextPokemonList(fetchNextPokemonList.results);
    setNextPokemonListTemp(fetchNextPokemonList.results);
    setLoading(false);
  };

  const fetchPokemonListByName = async (name: string) => {
    try {
      if (name.length == 0) {
        const fetchPokemonList = await getPokemon(10, 0);
        setNextPokemonList(fetchPokemonList.results);
        setPageNext(fetchPokemonList.next);
        setPagePrev(fetchPokemonList.previous);
        setIsFiltered(false);
        setLoading(false);
        return;
      }
      const fetchPokemonListByName = await getPokemonByName(
        name,
        nextPokemonList
      );
      setLoading(true);
      setIsFiltered(true);
      setNextPokemonList([]);
      setNextPokemonList(fetchPokemonListByName);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      handleErrorSearching(name);
      setLoading(false);
    }
  };

  const handleErrorSearching = (name: string) => {
    setNextPokemonList([]);
    const pokemonSearching: PokemonResult[] = [];
    nextPokemonListTemp.forEach((pokemon) => {
      console.log("Pokemon: " + pokemon);
      if (pokemon.name.includes(name)) {
        const serching: PokemonResult = {
          name: pokemon.name,
          url: pokemon.url,
          id: pokemon.id,
          urlIdividal: pokemon.urlIdividal,
        };
        pokemonSearching.push(serching);
      }
      setNextPokemonList(pokemonSearching);
    });
  };

  const handleButtonClick = async (action: string) => {
    if (action === ActionName.NEXT && !isFiltered) {
      if (pageNext == null) return;
      fetchNextPokemonList(pageNext);
    } else if (action === ActionName.PREV && !isFiltered) {
      if (pagePrev == null) return;
      fetchNextPokemonList(pagePrev);
    }
  };

  const handleSearchFilter = (value: string) => {
    fetchPokemonListByName(value);
  };

  return (
    <div className="min-h-screen bg-white">
      <PokedexHeader />
      <div className="flex justify-center text-black">
        <p className=" text-2xl font-semibold mt-2">Pokemon List</p>
      </div>
      <div className="flex justify-center mt-4">
        <SearchInput onChange={handleSearchFilter} />
      </div>
      <div className="flex justify-center">
        <div className="w-[1024px] flex justify-center">
          <div className=" grid grid-cols-2 md:grid-cols-5 gap-y-3 gap-4 mt-4 ">
            {!isLoading && <PokedexDetail pokemonList={nextPokemonList} />}
          </div>
          {nextPokemonList.length == 0 && nextPokemonList != undefined && (
            <div className=" text-black mt-4 ">
              Sorry, we couldn&rsquo;t find
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <ButtonCustom
          buttonName={ActionName.PREV}
          onClick={handleButtonClick}
        />
        <ButtonCustom
          buttonName={ActionName.NEXT}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

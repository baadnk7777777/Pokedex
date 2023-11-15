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
  const [nextPokemonSearchTemp, setNextPokemonSearchTemp] = useState<
    PokemonResult[]
  >([]);
  const [pageNext, setPageNext] = useState<string | null>();
  const [pagePrev, setPagePrev] = useState<string | null>();
  const [isLoading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [offset, setOffset] = useState(0);
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
        setLoading(true);
        const fetchPokemonList = await getPokemon(10, 0);
        setNextPokemonList([]);
        setNextPokemonList(fetchPokemonList.results);
        setPageNext(fetchPokemonList.next);
        setPagePrev(fetchPokemonList.previous);
        setIsFiltered(false);
        setLoading(false);
        console.log("Re Ferch");
        return;
      }
      const fetchPokemonListByName = await getPokemonByName(
        name,
      );
      const pokemonSerchingList: PokemonResult[] = [];
      fetchPokemonListByName.varieties.forEach(pokemonVarieties => {
        const pokemonSerching: PokemonResult = 
      {
        name: pokemonVarieties.pokemon.name,
        url: pokemonVarieties.pokemon.url,
    
      }
      pokemonSerchingList.push(pokemonSerching);
    },
    );
      setLoading(true);
      setIsFiltered(true);
      createPaginated(pokemonSerchingList,currentPage);
  
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
      if (pokemon.name.includes(name)) {
        const serching: PokemonResult = {
          name: pokemon.name,
          url: pokemon.url,
          urlIdividal: pokemon.urlIdividal,
          id: pokemon.id,
        };
        pokemonSearching.push(serching);
      }
      setNextPokemonList(pokemonSearching);
    });
  };

  const createPaginated = (pokemonList: PokemonResult[], page: number) => {
    // var offset;
    if(page <= 0) return;

    const itemsPerPage = 10;
    const offset = itemsPerPage * (page - 1);
    const totalPage = Math.ceil(pokemonList.length / itemsPerPage );

    setTotalPage(totalPage);
    setPageNext(totalPage > page ? String(page + 1) : null);
    setPagePrev(page - 1 ? String(page - 1) : null);

    if(page > totalPage) return;

    const paginatedItems = pokemonList.slice(offset, itemsPerPage * page);
    setNextPokemonList([]);
    setNextPokemonList(paginatedItems);
    setNextPokemonSearchTemp(pokemonList);
  }
  const handleButtonClick = async (action: string) => {
    if((action === ActionName.NEXT || action === ActionName.PREV) && !isFiltered) {
      const nextPage = action === ActionName.NEXT ? pageNext : pagePrev;
      if(nextPage == null) return;

      fetchNextPokemonList(nextPage);
    }
    if (action === ActionName.NEXT) {
      if(currentPage >= totalPage) return;
      setCurrentPage((currentPage) => currentPage + 1);
      createPaginated(nextPokemonSearchTemp, currentPage + 1);
    } else if (action === ActionName.PREV) {
      if(currentPage <= 1) return;
      setCurrentPage((currentPage) => Math.max(currentPage - 1));
      createPaginated(nextPokemonSearchTemp, currentPage - 1);
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
      <div className="flex  justify-center mt-4">
        <div className=" w-1/5"><SearchInput onChange={handleSearchFilter} /></div>
      </div>
      <div className="flex justify-center">
        <div className="w-[1024px] flex justify-center">
          <div className=" grid grid-cols-2 md:grid-cols-5 gap-y-3 gap-4 mt-4 ">
            {!isLoading && (
              <PokedexDetail pokemonList={nextPokemonList} offset={"0"} />
            )}
          </div>
          {nextPokemonList.length == 0 && nextPokemonList != undefined && (
            <div className=" text-black mt-4">
              Sorry, we couldn&rsquo;t find
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <ButtonCustom
          buttonDisable={pagePrev == null ? true : false}
          buttonName={ActionName.PREV}
          onClick={handleButtonClick}
        />
        <ButtonCustom
         buttonDisable={pageNext == null ? true : false}
          buttonName={ActionName.NEXT}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

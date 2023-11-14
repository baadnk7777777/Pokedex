import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { DEFAULT_POKEMON_OFFICIAL_IMAGE } from '@/Constant/ApiConstant';

interface PokedexCardProps  {
    pokedeximageUrl: string,
    pokedexNunber: string,
    pokedexName: string,
}


const PokedexCard:React.FC<PokedexCardProps> = (props) => {
  const [imageSrc, setImageSrc] = useState(props.pokedeximageUrl);

const handelImageError = (pokemonId:string) => {
  setImageSrc(`${DEFAULT_POKEMON_OFFICIAL_IMAGE}${pokemonId}.png`);
}

useEffect(() => {
  setImageSrc(imageSrc)
}, [imageSrc])
  return (
    <div className="  block  w-[200px] max-w-[500px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div className="flex justify-center">
          <Image
            alt="The Pokemon Image"
            src={imageSrc}
            width={1920}
            height={1080}
            layout="responsive"
            className=" object-contain"
            onError={()=> handelImageError(props.pokedexNunber)}
          />
        </div>
        <div className="">
          <p className=" text-base text-gray-700 mt-2">{props.pokedexNunber}</p>
          <p className="text-base text-gray-700 ">{props.pokedexName}</p>
        </div>
      </div>
  )
}

export default PokedexCard

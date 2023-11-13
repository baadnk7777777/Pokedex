import React from 'react'
import Image from "next/image";

interface PokedexCardProps  {
    pokedeximageUrl: string,
    pokedexNunber: string,
    pokedexName: string,
}

const PokedexCard:React.FC<PokedexCardProps> = (props) => {
  return (
    <div className="  block  max-w-[140px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div className="flex justify-center">
          <Image
            alt="The Pokemon Image"
            src={props.pokedeximageUrl}
            width={1920}
            height={1080}
            layout="responsive"
            className=" object-contain"
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

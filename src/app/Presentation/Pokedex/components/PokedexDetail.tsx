import React from 'react';
import PokedexCard from './PokedexCard';

interface PokedexPageProps {
    pokemonList: any[];
    offset: string;
}

const PokedexDetail:React.FC<PokedexPageProps> = (props) => {
    return (
        <>
            {props.pokemonList.map((item: any, index: any) => (
                <PokedexCard
                    key={index}
                    pokedexName={item.name}
                    pokedexNunber={String(Number(props.offset) + index+1).padStart(3, '0')}
                    pokedeximageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(Number(props.offset) + index+1)}.png`}
                    />
            ))}
        </>
    );
};

export default PokedexDetail;

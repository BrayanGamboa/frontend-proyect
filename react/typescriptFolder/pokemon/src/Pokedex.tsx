import { useState, useEffect } from "react";
import { type IPokemon } from "./Interface/Itype";

export function Pokedex() {
  const URL = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=1";

  const [data, setData] = useState<string[]>([]);
  const [pokemones, setPokemones] = useState<IPokemon[]>([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data: { results: IPokemon[] }) => {
        setData(data.results.map((pokemon) => pokemon.url).filter((v): v is string => !!v));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  data.map((pokemon) =>{
    fetch(pokemon)
      .then((response) => response.json())
      .then((data: IPokemon) => {
        setPokemones((prevPokemones) => [...prevPokemones, data]);
      })
      .catch((error) => console.error("Error fetching pokemon details:", error));

  })

 return(
  <>
     {pokemones.map((pokemon) => (
       <div key={pokemon.id}>
         <h2>{pokemon.name}</h2>
         <img src={pokemon.sprites.front_default} alt={pokemon.name} />
         <ul>
           {pokemon.abilities.map((ability) => (
             <li key={ability.ability.name}>{ability.ability.name}</li>
           ))}
         </ul>
       </div>
     ))}
  </>
 );

}
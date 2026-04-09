export interface IPokeAbility {
  ability: {
    name: string
  }
}

export interface IPokemon {
  id: number;
  name: string;
  url?: string;
  sprites: {
    front_default: string;
  };
  abilities: IPokeAbility[];
}
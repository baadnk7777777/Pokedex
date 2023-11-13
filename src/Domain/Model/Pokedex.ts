export interface PokemonResult {
    name: string
    url: string
  }

export interface PokemonAPIResponse {
    count: number
    next: string
    previous: any
    results: PokemonResult[]
  }
  

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { PokemonList, PokemonDetails } from '../interfaces/pokemon.interface';
import { makeStateKey, TransferState, StateKey } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly http = inject(HttpClient);
  private readonly transferState = inject(TransferState);

  async getPokemons(
    limit: number = 20,
    offset: number = 0
  ): Promise<PokemonList> {
    const key: StateKey<PokemonList> = makeStateKey<PokemonList>(
      `pokemonList-${limit}-${offset}`
    );

    const cachedData = this.transferState.get(key, null);
    if (cachedData) {
      return cachedData;
    }

    const data = await firstValueFrom(
      this.http.get<PokemonList>(`${this.baseUrl}/pokemon`, {
        params: { limit, offset },
      })
    );

    this.transferState.set(key, data);
    return data;
  }

  async getPokemonDetails(id: string): Promise<PokemonDetails> {
    const key: StateKey<PokemonDetails> = makeStateKey<PokemonDetails>(
      `pokemon-${id}`
    );

    const cachedData = this.transferState.get(key, null);
    if (cachedData) {
      return cachedData;
    }

    const data = await firstValueFrom(
      this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${id}`)
    );

    this.transferState.set(key, data);
    return data;
  }
}

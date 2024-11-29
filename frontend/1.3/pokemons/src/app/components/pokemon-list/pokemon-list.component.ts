import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonBasic } from '../../interfaces/pokemon.interface';
import { LoaderComponent } from '../loader/loader.component';
import { pokemonListAnimations } from './pokemon-list.animations';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  animations: [pokemonListAnimations],
})
export class PokemonListComponent implements OnInit {
  pokemons: PokemonBasic[] = [];
  offset = 0;
  limit = 20;
  loading = true;
  loadedImages = new Set<string>();

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['page']) {
        const page = Number(params['page']);
        this.offset = (page - 1) * this.limit;
      }
      this.loadPokemons();
    });
  }

  async loadPokemons() {
    try {
      const data = await this.pokemonService.getPokemons(
        this.limit,
        this.offset
      );
      this.pokemons = data.results;
    } finally {
      this.loading = false;
    }
  }

  async loadNext() {
    const nextPage = this.offset / this.limit + 2;
    await this.router.navigate(['/page', nextPage]);
  }

  async loadPrevious() {
    const prevPage = this.offset / this.limit;
    if (prevPage <= 1) {
      await this.router.navigate(['/']);
    } else {
      await this.router.navigate(['/page', prevPage]);
    }
  }

  onImageLoad(pokemonName: string) {
    this.loadedImages.add(pokemonName);
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../interfaces/pokemon.interface';
import { LoaderComponent } from '../loader/loader.component';
import { pokemonDetailsAnimations } from './pokemon-details.animations';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  animations: [pokemonDetailsAnimations],
})
export class PokemonDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  pokemon: PokemonDetails | null = null;
  loading = true;
  mainImage: string = '';

  async ngOnInit() {
    window.scrollTo(0, 0);
    const id = this.route.snapshot.params['id'];
    try {
      this.pokemon = await this.pokemonService.getPokemonDetails(id);
      this.mainImage =
        this.pokemon.sprites.other['official-artwork'].front_default;
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    const page = Number(this.route.snapshot.queryParams['page']) || 1;
    const pokemonId = this.pokemon?.id;

    const targetPath = page === 1 ? ['/'] : ['/page', page];

    this.router.navigate(targetPath).then(() => {
      setTimeout(() => {
        const element = document.getElementById(`pokemon-${pokemonId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlighted');
          setTimeout(() => {
            element.classList.remove('highlighted');
          }, 1500);
        }
      }, 100);
    });
  }

  changeMainImage(newImage: string) {
    this.mainImage = newImage;
  }
}

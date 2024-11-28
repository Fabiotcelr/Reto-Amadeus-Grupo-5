import { Component, OnInit } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.css',
})
export class DestinoComponent implements OnInit {
  constructor(public destinoService: DestinoService) {}

  control: boolean = true;
  loading: boolean = true;

  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];
  loadingImages: boolean = true;

  ngOnInit(): void {
    this.loadDestinos();
  }

  loadDestinos() {
    this.loading = true;
    setTimeout(() => {
      this.destino();
    }, 500);
  }

  destino() {
    sessionStorage.getItem('destinoAmerica') === 'Bora Bora'
      ? (this.control = false)
      : (this.control = true);

    this.destinoService
      .getDestinity(
        `searchByName/${sessionStorage.getItem(
          'destinoAmerica'
        )}/${sessionStorage.getItem('destinoEuropa')}`
      )
      .then((response) => {
        this.destinos = response;
        this.filtrarDestinos();
        this.loading = false;
        this.checkImages();
      })
      .catch((error) => {
        console.error('Error', error);
        this.loading = false;
      });
  }

  filtrarDestinos(): void {
    this.america = this.destinos.filter(
      (destino) =>
        destino.continente === 'América' || destino.continente === 'Oceanía'
    );
    this.europa = this.destinos.filter(
      (destino) =>
        destino.continente === 'Europa' || destino.continente === 'Asia'
    );
  }

  checkImages(): void {
    if (!this.america[0]?.img || !this.europa[0]?.img) {
      setTimeout(() => {
        this.loadDestinos();
      }, 2000); // Retry after 2 seconds
    }
  }
}
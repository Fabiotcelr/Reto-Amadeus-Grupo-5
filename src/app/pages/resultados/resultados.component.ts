import { Component, importProvidersFrom } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  constructor(public destinoService: DestinoService) {}

  destinoAmerica = '';
  destinoEuropa = '';
  pDestino = this.destinoService.respuestasSer[0];
  // pNanInt = "Nacional";
  pClimatica = this.destinoService.respuestasSer[1];
  // pLluvia = "Clima seco";
  pActividad = this.destinoService.respuestasSer[2];
  // pGastronomia = "Comida Local";
  pAlojamiento = this.destinoService.respuestasSer[3];
  // pCentroAfueras = "Centro de la Ciudad";
  dViaje = this.destinoService.respuestasSer[4];
  // pDescanso = "1-2 días act.intensas";
  edad = this.destinoService.respuestasSer[5];

  volverAtras() {
    this.destinoService.indice = 5;
    this.destinoService.respuestasSer.pop();
  }

  enviarDestino() {
    // Llama al método `sendCombination` del servicio `DestinoService`, enviando un objeto con las respuestas seleccionadas
    this.destinoService
      .sendCombination('enviarDestino', {
        // Parámetros que se envían en el cuerpo de la solicitud POST
        pDestino: this.destinoService.respuestasSer[0],
        pClimatica: this.destinoService.respuestasSer[1],
        pActividad: this.destinoService.respuestasSer[2],
        pAlojamiento: this.destinoService.respuestasSer[3],
        dViaje: this.destinoService.respuestasSer[4],
        edad: this.destinoService.respuestasSer[5],
      })
      .then((response) => {
        this.destinoService.destinoA = response.destinoA;
        this.destinoService.destinoE = response.destinoE;
        sessionStorage.setItem('destinoAmerica', response.destinoA);
        sessionStorage.setItem('destinoEuropa', response.destinoE);
      })
      .catch((error) => {
        console.error('Error al enviar destino:', error);
      });
  }
}

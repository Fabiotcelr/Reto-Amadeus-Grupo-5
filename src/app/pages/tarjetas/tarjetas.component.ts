import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DestinoService } from '@services/destino.service';
import { Router } from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css',
})
export class TarjetasComponent {
  constructor(public destinoService: DestinoService, public router: Router) {}

  indice = this.destinoService.indice;
  opcSelect: String = '';

  respuestas: String[] = [];

  disSig = true;
  disAtras = true;
  hidSig = false;
  calcular = true;

  t0 = 'contador';
  t1 = 'contador';
  t2 = 'contador';
  t3 = 'contador';
  t4 = 'contador';
  t5 = 'contador';

  nombre = this.destinoService.nombreS;
  avatar = this.destinoService.avatar;

  preguntaA = [
    '¿Que tipo de entorno prefieres para tus vacaciones?',
    '¿Qué clima prefieres durante tus vacaciones?',
    '¿Qué tipo de actividades prefieres hacer durante tus vacaciones?',
    '¿Qué tipo de alojamiento prefieres?',
    '¿Cuánto tiemplo planeas quedarte de vacaciones?',
    '¿Cuál es tu rango de edad?',
  ];

  opcionesA = [
    ['Playa', 'Montaña', 'Ciudad'],
    ['Caluroso', 'Templado', 'Frío'],
    ['Deportes y Aventuras', 'Cultura y Museos', 'Relax y Bienestar'],
    ['Hotel de Lujo', 'Hostal o Albergue', 'Airbnb'],
    ['Menos de una semana', '1-2 semanas', 'Más de dos semanas'],
    ['Menos de 30 años', '30-50 años', 'Más de 50 años'],
  ];

  imgUrl = [
    [
      '../../../assets/img/imagen1.jpg',
      '../../../assets/img/imagen2.jpg',
      '../../../assets/img/imagen3.jpg',
    ],
    [
      '../../../assets/img/Tulum.jpg',
      '../../../assets/img/Templado.jpg',
      '../../../assets/img/Frio.jpg',
    ],
    [
      '../../../assets/img/Aventura.jpg',
      '../../../assets/img/cultura.jpg',
      '../../../assets/img/relax.jpg',
    ],
    [
      '../../../assets/img/hotelujo.jpg',
      '../../../assets/img/hostal.jpg',
      '../../../assets/img/airbnb.jpg',
    ],
    [
      '../../../assets/img/findesemana.jpg',
      '../../../assets/img/dosemanas.jpg',
      '../../../assets/img/calendario.jpg',
    ],
    [
      '../../../assets/img/veinte.jpg',
      '../../../assets/img/treinta.jpg',
      '../../../assets/img/cincuenta.jpg',
    ],
  ];

  dato = [
    [
      'Las playas no siempre son doradas?. Hay playas con arena negra volcánica, rosa coralina y hasta verde olivo. ¡Cada grano de arena cuenta una historia!',
      'Las montañas tienen su propio clima?. Al subir una montaña, puedes experimentar diferentes climas en pocos kilómetros. ¡Es como viajar por el mundo sin salir de una misma montaña!',
      'Muchas ciudades tienen secretos subterráneos?. Bajo las calles de muchas ciudades se encuentran redes de túneles, ríos subterráneos y hasta antiguas ruinas. París, por ejemplo, tiene más de 200 kilómetros de túneles subterráneos.',
    ],
    [
      'En muchos lugares con clima cálido se celebran festivales y eventos al aire libre, aprovechando las altas temperaturas.',
      'Muchas de las rutas turísticas más famosas del mundo se encuentran en regiones con clima templado, como la Ruta de la Costa Amalfitana en Italia o la Ruta 66 en Estados Unidos.',
      'En lugares con clima frío, el turismo se concentra principalmente en los meses de invierno, cuando la nieve cubre el paisaje y se pueden practicar deportes como el esquí, el snowboard y el patinaje sobre hielo.',
    ],
    [
      'Desde las montañas de Nepal hasta los ríos de Costa Rica, existen numerosos destinos que ofrecen experiencias únicas para los amantes de la adrenalina.',
      'Al visitar los museos, los viajeros pueden imaginar cómo era la vida en la corte real y apreciar la arquitectura y el diseño de una época pasada.',
      'Al visitar un baño termal, los viajeros pueden conectar con las tradiciones de culturas antiguas y experimentar una forma de relajación que ha sido practicada durante siglos.',
    ],
    [
      'Algunos de los hoteles más lujosos del mundo ofrecen experiencias tan exclusivas que incluyen la posibilidad de tener un mayordomo que se encargue de todos tus caprichos, desde preparar un baño relajante hasta hacer reservas en el restaurante más exclusivo',
      'Muchos de los hostales y albergues más populares del mundo se encuentran ubicados en edificios históricos o con una arquitectura única',
      'Airbnb o apartamento:Airbnb nació de una necesidad de alojamiento económico durante un evento en San Francisco.',
    ],
    [
      'Estudios han demostrado que incluso viajes cortos pueden tener un impacto significativo en la reducción del estrés y la mejora del estado de ánimo.',
      'Estudios han demostrado que este rango de tiempo permite sumergirte en la cultura local, conocer a fondo un lugar y crear recuerdos duraderos sin sentirte apresurado o abrumado.',
      'Viajes prolongados te permiten desconectar completamente de tu rutina diaria y volver a casa sintiéndote renovado y con una nueva perspectiva de la vida.',
    ],
    [
      'Viajar en la veintena te ayuda a desarrollar habilidades como la independencia, la adaptabilidad y la tolerancia a la incertidumbre, lo cual es fundamental para tu crecimiento personal.',
      'A menudo, se busca ir más allá de los destinos turísticos más populares y descubrir lugares menos conocidos, con una mayor conexión con la cultura local.',
      'Muchos viajeros mayores se unen a grupos organizados para conocer a personas con intereses similares y compartir experiencias.',
    ],
  ];

  pregunta = this.preguntaA[this.indice];
  opcion1 = this.opcionesA[this.indice][0];
  opcion2 = this.opcionesA[this.indice][1];
  opcion3 = this.opcionesA[this.indice][2];
  img1 = this.imgUrl[this.indice][0];
  img2 = this.imgUrl[this.indice][1];
  img3 = this.imgUrl[this.indice][2];
  dato1 = this.dato[this.indice][0];
  dato2 = this.dato[this.indice][1];
  dato3 = this.dato[this.indice][2];

  verificarSeleccion() {
    if (this.opcSelect != '') {
      this.disSig = false;
    }
    if (this.indice == 0) {
      this.disAtras = true;
    }

    if (this.indice >= 0) {
      this.t0 = 'contadorOn';
    }

    if (this.indice >= 1) {
      this.t1 = 'contadorOn';
    }
    if (this.indice >= 2) {
      this.t2 = 'contadorOn';
    }
    if (this.indice >= 3) {
      this.t3 = 'contadorOn';
    }
    if (this.indice >= 4) {
      this.t4 = 'contadorOn';
    }
    if (this.indice >= 5) {
      this.t5 = 'contadorOn';
    }
  }

  siguiente() {
    if (this.indice == 5) {
      this.destinoService.respuestasSer.push(this.opcSelect);
      console.log(this.destinoService.respuestasSer);

      this.hidSig = true;
      this.calcular = false;
      this.disAtras = false;
      this.opcSelect = '';
      return;
    } else {
      this.hidSig = false;
    }

    this.destinoService.respuestasSer.push(this.opcSelect);
    console.log(this.destinoService.respuestasSer);
    this.indice++;

    this.pregunta = this.preguntaA[this.indice];
    this.opcion1 = this.opcionesA[this.indice][0];
    this.opcion2 = this.opcionesA[this.indice][1];
    this.opcion3 = this.opcionesA[this.indice][2];
    this.img1 = this.imgUrl[this.indice][0];
    this.img2 = this.imgUrl[this.indice][1];
    this.img3 = this.imgUrl[this.indice][2];
    this.dato1 = this.dato[this.indice][0];
    this.dato2 = this.dato[this.indice][1];
    this.dato3 = this.dato[this.indice][2];

    this.opcSelect = '';
    this.disSig = true;
    this.disAtras = false;

    console.log(this.indice);
  }

  atras() {
    if (this.indice == 0) {
      this.destinoService.respuestasSer.pop();
      this.disAtras = true;
      this.opcSelect = '';
      return;
    }

    if (this.indice == 5) {
      this.disSig = true;
    }

    //validación si el array está completo y se quiere volver a la pregunta anterior, se eliminan dos respuestas
    if (this.destinoService.respuestasSer.length == 6) {
      this.destinoService.respuestasSer.pop();
    }

    this.destinoService.respuestasSer.pop();
    console.log(this.destinoService.respuestasSer);

    this.indice--;

    this.pregunta = this.preguntaA[this.indice];
    this.opcion1 = this.opcionesA[this.indice][0];
    this.opcion2 = this.opcionesA[this.indice][1];
    this.opcion3 = this.opcionesA[this.indice][2];
    this.img1 = this.imgUrl[this.indice][0];
    this.img2 = this.imgUrl[this.indice][1];
    this.img3 = this.imgUrl[this.indice][2];
    this.dato1 = this.dato[this.indice][0];
    this.dato2 = this.dato[this.indice][1];
    this.dato3 = this.dato[this.indice][2];

    this.opcSelect = '';
    this.hidSig = false;
    this.calcular = true;

    if (this.indice == 0) {
      this.t0 = 'contador';
      this.t1 = 'contador';
      this.t2 = 'contador';
      this.t3 = 'contador';
      this.t4 = 'contador';
      this.t5 = 'contador';
    }
    if (this.indice == 1) {
      this.t1 = 'contador';
      this.t2 = 'contador';
      this.t3 = 'contador';
      this.t4 = 'contador';
      this.t5 = 'contador';
    }
    if (this.indice == 2) {
      this.t2 = 'contador';
      this.t3 = 'contador';
      this.t4 = 'contador';
      this.t5 = 'contador';
    }
    if (this.indice == 3) {
      this.t3 = 'contador';
      this.t4 = 'contador';
      this.t5 = 'contador';
    }
    if (this.indice == 4) {
      this.t4 = 'contador';
      this.t5 = 'contador';
    }
    if (this.indice == 5) {
      this.t5 = 'contador';
    }
  }

  ruta = '';

  regresarPerfil() {
    let confirmar = confirm(
      '¿Desea crear un nuevo perfir y restablecer las opciones seleccionadas?'
    );

    if (confirmar == false) {
      return;
    } else {
      this.destinoService.indice = 0;
      let longitud = this.destinoService.respuestasSer.length;

      for (let i = 0; i <= longitud; i++) {
        this.destinoService.respuestasSer.pop();
      }

      this.ruta = '/perfil';
      this.router.navigate([this.ruta]);
    }
  }
}

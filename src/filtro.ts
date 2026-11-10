import { Correo } from './correo';
import { Predicado } from './predicados';

export class Filtro {
  public readonly nombre: string;
  public readonly predicado: Predicado;

  constructor(nombre: string, predicado: Predicado) {
    this.nombre = nombre;
    this.predicado = predicado;
  }

  public aplicar(coleccion: Correo[]): Correo[] {
    return coleccion.filter(this.predicado);
  }
}
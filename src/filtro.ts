import { Correo } from './correo';
import { Predicado } from './predicados';
import { BandejaEnviados, BandejaBorradores, BandejaRecibidos } from '../src/bandejas';
import { GestorBandejas } from './gestorbandejas';

export class Filtro {
  public readonly nombre: string;
  public readonly predicado: Predicado;

  constructor(nombre: string, predicado: Predicado) {
    this.nombre = nombre;
    this.predicado = predicado;
  }

  public aplicar(coleccion: GestorBandejas | Correo[]): Correo[] {
    const arregloAFiltrar = coleccion instanceof GestorBandejas ? coleccion.correos : coleccion;
    return arregloAFiltrar.filter(this.predicado);
  }
}
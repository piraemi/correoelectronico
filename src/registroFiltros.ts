import { Filtro } from './filtro';

export class RegistroFiltros {
  private _filtros: Map<string, Filtro> = new Map();

  public registrarFiltro(filtro: Filtro): void {
    if (this._filtros.size >= 5 && !this._filtros.has(filtro.nombre)) {
      throw new Error("Se ha alcanzado el límite máximo de 5 filtros personalizados.");
    }
    this._filtros.set(filtro.nombre, filtro);
  }

  public obtenerFiltro(nombre: string): Filtro | undefined {
    return this._filtros.get(nombre);
  }

  public get cantidad(): number {
    return this._filtros.size;
  }
}
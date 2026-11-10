import { describe, it, expect, beforeEach } from 'vitest';
import { RegistroFiltros } from '../src/registroFiltros';
import { Filtro } from '../src/filtro';

describe("RegistroFiltros", () => {
  let registro: RegistroFiltros;
  // Predicado dummy para instanciar filtros rápidamente
  const predicadoVacio = () => true; 

  beforeEach(() => {
    registro = new RegistroFiltros();
  });
  it("debe registrar un filtro y permitir recuperarlo por nombre", () => {
    const filtro = new Filtro("MiFiltro", predicadoVacio);
    registro.registrarFiltro(filtro);
    
    expect(registro.obtenerFiltro("MiFiltro")).toBe(filtro);
    expect(registro.cantidad).toBe(1);
  });
  it("debe lanzar un error al intentar registrar un sexto filtro distinto", () => {
    registro.registrarFiltro(new Filtro("Filtro1", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro2", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro3", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro4", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro5", predicadoVacio));

    expect(() => registro.registrarFiltro(new Filtro("Filtro6", predicadoVacio))).toThrowError("Se ha alcanzado el límite máximo de 5 filtros personalizados.");
  });
  it("debe permitir reescribir un filtro existente aunque se haya alcanzado el límite", () => {
    registro.registrarFiltro(new Filtro("Filtro1", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro2", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro3", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro4", predicadoVacio));
    registro.registrarFiltro(new Filtro("Filtro5", predicadoVacio));

    // Como "Filtro1" ya existe en el Map, deberiamos poder actualizarlo sin romper la regla de 5
    expect(() => {
      registro.registrarFiltro(new Filtro("Filtro1", () => false));
    }).not.toThrow();
    
    expect(registro.cantidad).toBe(5);
  });
});
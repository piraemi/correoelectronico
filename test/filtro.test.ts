import { describe, it, expect } from 'vitest';
import { filtroLeidosFavoritos } from '../src/filtrosMultiples';
import { Correo } from '../src/correo';

describe("Filtro y aplicacion de filtros", () => {
    it("debea aplicar correctamente el filtro de leidos y favoritos", () => {
        const correoCumple = {ID:1, leido: true, favorito: true} as Correo;
        const correoNoCumpleLeido = {ID:2, leido: false, favorito: true} as Correo;

        const bandejaOriginal = [correoCumple, correoNoCumpleLeido];

        const bandejaFiltrada = filtroLeidosFavoritos.aplicar(bandejaOriginal);

        expect(bandejaFiltrada).toContain(correoCumple);
        expect(bandejaFiltrada).not.toContain(correoNoCumpleLeido);
        expect(bandejaFiltrada.length).toBe(1);

        expect(bandejaOriginal.length).toBe(2); // Verifica que la bandeja original no se haya modificado
        expect(bandejaOriginal[0]).toBe(correoCumple);
        expect(bandejaOriginal[1]).toBe(correoNoCumpleLeido);
    });
});
import { describe, it, expect } from 'vitest';
import { filtroLeidosFavoritos, filtroUrgentesNoLeidos } from '../src/filtrosMultiples';
import { Correo } from '../src/correo';
import { EnviadorCorreo } from '../src/enviadorCorreo';
import { BandejaEnviados, BandejaBorradores, BandejaRecibidos } from '../src/bandejas';
import { Contacto } from '../src/contacto'
import { noLeido } from '../src/predicados';

describe("Filtro y aplicacion de filtros", () => {
    it("debea aplicar correctamente el filtro de leidos y favoritos", () => {
        const correoCumple = { ID: 1, Noleido: true, favorito: true } as Correo;
        const correoNoCumpleLeido = { ID: 2, Noleido: false, favorito: true } as Correo;

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

describe("Test envio de 100 correos y aplicacion de filtros", () => {
    it("debe enviar 100 correos y buscar los que cumplen con el filtro de urgentes", () => {
        const enviados = new BandejaEnviados();
        const borradores = new BandejaBorradores();
        const enviador = new EnviadorCorreo(enviados, borradores);
        const destinatarioTest = new Contacto('Nombre', 'test100@mail.com')
        const remitenteTest = new Contacto("nombre", "remitente@mail.com")

        for (let i = 1; i < 100; i++) {
            const asunto = i % 7 === 0 ? "Urgente: Asunto" + i : "Asunto" + i;
            const correoUrgente = new Correo(i, asunto, "Cuerpo", remitenteTest, [destinatarioTest])
            if (i%2 === 0) {
                correoUrgente.Noleido= false
            }

            enviador.enviarCorreo(correoUrgente)
        }

        const bandejaFiltrada = filtroUrgentesNoLeidos.aplicar(enviados);

        expect(bandejaFiltrada.every(c => c.asunto.toLowerCase().includes("urgente") && c.Noleido)).toBe(true);
        expect(bandejaFiltrada.length).toEqual(7); // Debería haber 7 correos que cumplen con el filtro

    });
});
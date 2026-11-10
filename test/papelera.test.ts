import { describe, it, expect, beforeEach } from 'vitest';
import { Papelera } from '../src/papelera';
import { BandejaRecibidos, BandejaEliminados } from '../src/bandejas';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';

describe("Papelera", () => {
    let recibidos: BandejaRecibidos;
    let eliminados: BandejaEliminados;
    let papelera: Papelera;
    let correo: Correo;

    beforeEach(() => {
        const ana = new Contacto("Ana Pérez", "ana@gmail.com");
        const juan = new Contacto("Juan Gómez", "juan@hotmail.com");
        correo = new Correo(1, "Hola", "Cómo estás", ana, [juan]);
        recibidos = new BandejaRecibidos();
        eliminados = new BandejaEliminados();
        papelera = new Papelera(eliminados);
        recibidos.agregarCorreo(correo);
    });

    it("debe mover un correo a Eliminados", () => {
        papelera.eliminar(correo, recibidos);

        expect(eliminados.correos).toContain(correo);
        expect(recibidos.correos).not.toContain(correo);
    });
    it("debe lanzar error al intentar restaurar un correo que no está en Eliminados", () => {
        expect(() => papelera.restaurar(correo)).toThrowError(`El correo ${correo.ID} no está en Eliminados`);
    });
});
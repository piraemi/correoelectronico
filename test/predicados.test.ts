import { remitenteDeDominio, asuntoContiene } from '../src/predicados';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';
import { describe, it, expect } from 'vitest';

describe("Predicados", () => {
    it("debe identificar los correos que cumplen cada condición", () => {
        const ana = new Contacto("Ana Pérez", "ana@empresa.com");
        const juan = new Contacto("Juan Gómez", "juan@gmail.com");
        const correo1 = new Correo("Hola", "Cómo estás", ana, [juan]);
        const correo2 = new Correo("Chau", "Nos vemos", juan, [ana]);
        const correos = [correo1, correo2];

        expect(correos.filter(remitenteDeDominio("@empresa.com"))).toEqual([correo1]);
        expect(correos.filter(asuntoContiene("chau"))).toEqual([correo2]);
    });
});
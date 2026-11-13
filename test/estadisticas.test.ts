import { Estadisticas } from '../src/estadisticas';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';
import { describe, it, expect } from 'vitest';

describe("Estadisticas", () => {
    const ana = new Contacto("Ana Pérez", "ana@gmail.com");
    const juan = new Contacto("Juan Gómez", "juan@hotmail.com");
    const correo1 = new Correo("Hola", "Cómo estás", ana, [juan]);
    const correo2 = new Correo("Chau", "Nos vemos", juan, [ana]);
    const correos = [correo1, correo2];

    it("debe obtener la lista de asuntos", () => {
        expect(Estadisticas.asuntos(correos)).toEqual(["Hola", "Chau"]);
    });
});
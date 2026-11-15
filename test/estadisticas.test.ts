import { Estadisticas } from '../src/estadisticas';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';
import { describe, it, expect } from 'vitest';
import { noLeido } from '../src/predicados';

describe("Estadisticas", () => {
    const ana = new Contacto("Ana Pérez", "ana@gmail.com");
    const juan = new Contacto("Juan Gómez", "juan@hotmail.com");
    const correo1 = new Correo(1, "Hola", "Cómo estás", ana, [juan]);
    const correo2 = new Correo(2, "Chau", "Nos vemos", juan, [ana]);
    const correos = [correo1, correo2];

    it("debe obtener la lista de asuntos", () => {
        expect(Estadisticas.asuntos(correos)).toEqual(["Hola", "Chau"]);
    });
        it("debe obtener los correos que cumplen una condición", () => {
        correo1.leido = true;
        expect(Estadisticas.queCumplen(correos, noLeido)).toEqual([correo2]);
    });
        it("debe contar los correos que cumplen una condición", () => {
        const correoA = new Correo(3, "Uno", "Texto", ana, [juan]);
        const correoB = new Correo(4, "Dos", "Texto", ana, [juan]);
        const correoC = new Correo(5, "Tres", "Texto", ana, [juan]);
        correoA.leido = true;

        expect(Estadisticas.contar([correoA, correoB, correoC], noLeido)).toBe(2);
    });
});
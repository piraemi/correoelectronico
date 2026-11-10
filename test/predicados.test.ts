import { remitenteDeDominio, asuntoContiene, AND, OR, NOT, Predicado } from '../src/predicados';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';
import { describe, it, expect } from 'vitest';


describe("Predicados", () => {
    it("debe identificar los correos que cumplen cada condición", () => {
        const ana = new Contacto("Ana Pérez", "ana@empresa.com");
        const juan = new Contacto("Juan Gómez", "juan@gmail.com");
        const correo1 = new Correo("Hola", "Cómo estás", ana, [juan]);
        const correo2 = new Correo("Chau", "Nos vemos", juan, [ana]);
        const destinatario = new Contacto("Destinatario", "destinatario@empresa.com");
        const correos = [correo1, correo2];

        expect(correos.filter(remitenteDeDominio("@empresa.com"))).toEqual([correo1]);
        expect(correos.filter(asuntoContiene("chau"))).toEqual([correo2]);
    });
});

describe("Operadores lógicos funcionales", () => {
    const correoMock = {} as Correo; 

    const siempreVerdadero: Predicado = () => true;
    const siempreFalso: Predicado = () => false;
    it("AND debe devolver verdadero solo si ambos predicados son verdaderos", () => {
        expect(AND(siempreVerdadero, siempreVerdadero)(correoMock)).toBe(true);
        expect(AND(siempreVerdadero, siempreFalso)(correoMock)).toBe(false);
        expect(AND(siempreFalso, siempreVerdadero)(correoMock)).toBe(false);
        expect(AND(siempreFalso, siempreFalso)(correoMock)).toBe(false);
    });
    it("OR debe devolver verdadero si al menos uno de los predicados es verdadero", () => {
        expect(OR(siempreVerdadero, siempreVerdadero)(correoMock)).toBe(true);
        expect(OR(siempreVerdadero, siempreFalso)(correoMock)).toBe(true);
        expect(OR(siempreFalso, siempreVerdadero)(correoMock)).toBe(true);
        expect(OR(siempreFalso, siempreFalso)(correoMock)).toBe(false);
    });
    it("NOT debe invertir el resultado del predicado", () => {
        expect(NOT(siempreVerdadero)(correoMock)).toBe(false);
        expect(NOT(siempreFalso)(correoMock)).toBe(true);
    });
});

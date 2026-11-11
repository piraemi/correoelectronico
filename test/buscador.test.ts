import { Buscador } from '../src/buscador';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';
import { describe, it, expect } from 'vitest';

describe("Buscador", () => {
    const ana = new Contacto("Ana Pérez", "ana@gmail.com");
    const juan = new Contacto("Juan Gómez", "juan@hotmail.com");    
    const correo1 = new Correo("Hola", "Cómo estás", ana, [juan]);     
    const correo2 = new Correo("Chau", "Nos vemos", juan, [ana]);
    const correos = [correo1, correo2];

    it("debe buscar en el asunto sin distinguir mayúsculas y con coincidencias parciales", () => {
        expect(Buscador.buscar(correos, "HOL")).toEqual([correo1]);
    });

    it("debe buscar en el contenido", () => {
        expect(Buscador.buscar(correos, "vemos")).toEqual([correo2]);
    });

    it("debe buscar por nombre o email del remitente y destinatarios", () => {
        expect(Buscador.buscar(correos, "gómez")).toEqual([correo1, correo2]);
        expect(Buscador.buscar(correos, "hotmail")).toEqual([correo1, correo2]);
    });

    it("debe devolver un correo una sola vez aunque coincida en varios campos", () => {
        expect(Buscador.buscar(correos, "ana")).toEqual([correo1, correo2]);
    });

    it("debe devolver una lista vacía si no hay coincidencias o la bandeja está vacía", () => {
        expect(Buscador.buscar(correos, "vacaciones")).toEqual([]);
        expect(Buscador.buscar([], "hola")).toEqual([]);
    });

    it("no debe modificar los correos originales", () => {
        Buscador.buscar(correos, "hola");
        expect(correos).toEqual([correo1, correo2]);
        expect(correo1.asunto).toBe("Hola");
    });
});
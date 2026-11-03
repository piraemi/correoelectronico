import { Agenda } from '../src/agenda';
import { Contacto } from '../src/contacto';
import { describe, it, expect, beforeEach } from 'vitest';

describe("Agenda", () => {
    let agenda: Agenda;

    beforeEach(() => {
        agenda = new Agenda();
    });

    it("debe agregar un contacto nuevo", () => {
        const ana = new Contacto("Ana Pérez", "ana@ucp.edu.ar");
        agenda.agregar(ana);

        expect(agenda.contactos).toContain(ana);
    });
        it("debe buscar un contacto por email", () => {
        const ana = new Contacto("Ana Pérez", "ana@ucp.edu.ar");
        agenda.agregar(ana);

        expect(agenda.buscar("ana@ucp.edu.ar")).toBe(ana);
        expect(agenda.buscar("nadie@ucp.edu.ar")).toBeUndefined();
    });
        it("no debe permitir dos contactos con el mismo email", () => {
        agenda.agregar(new Contacto("Ana Pérez", "ana@ucp.edu.ar"));

        expect(() => agenda.agregar(new Contacto("Otra Ana", "ANA@ucp.edu.ar"))).toThrow();
        expect(agenda.contactos.length).toBe(1);
    });
        it("debe modificar el nombre y el email de un contacto", () => {
        agenda.agregar(new Contacto("Ana Pérez", "ana@ucp.edu.ar"));
        agenda.modificar("ana@ucp.edu.ar", "Ana María Pérez", "anamaria@ucp.edu.ar");

        const modificado = agenda.buscar("anamaria@ucp.edu.ar");
        expect(modificado?.nombreCompleto).toBe("Ana María Pérez");
        expect(agenda.existe("ana@ucp.edu.ar")).toBe(false);
    });
        it("no debe modificar el email a uno que ya usa otro contacto", () => {
        agenda.agregar(new Contacto("Ana Pérez", "ana@ucp.edu.ar"));
        agenda.agregar(new Contacto("Juan Gómez", "juan@gmail.com"));

        expect(() => agenda.modificar("juan@gmail.com", "Juan Gómez", "ana@ucp.edu.ar")).toThrow();
    });
}); 
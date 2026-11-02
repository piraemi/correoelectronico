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
});
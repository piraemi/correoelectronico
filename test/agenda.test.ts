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
});
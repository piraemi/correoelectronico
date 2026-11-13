import {Correo} from '../src/correo';
import {Contacto} from '../src/contacto';
import { describe, it, expect } from 'vitest';

describe('Correo', () => {
    let remitente: Contacto;
    let destinatario1: Contacto;
    let destinatario2: Contacto;
    let correo: Correo;
    it("debe crear correo con remitente y destinatarios válidos", () => {
        remitente = new Contacto("Juan Pérez", "juan.perez@gmail.com");
        destinatario1 = new Contacto("María García", "maria.garcia@gmail.com");
        destinatario2 = new Contacto("Carlos López", "carlos.lopez@gmail.com");
        correo = new Correo(1, "Asunto del correo", "Contenido del correo", remitente, [destinatario1, destinatario2]);
        expect(correo.remitente).toBe(remitente);
        expect(correo.destinatarios).toContain(destinatario1);
        expect(correo.destinatarios).toContain(destinatario2);
        expect(correo.asunto).toBe("Asunto del correo");
        expect(correo.contenido).toBe("Contenido del correo");
    });
    it("debe lanzar error al crear correo sin remitente", () => {
        remitente = null as unknown as Contacto; // Forzamos un valor nulo para el remitente
        destinatario1 = new Contacto("María García", "maria.garcia@gmail.com");
        destinatario2 = new Contacto("Carlos López", "carlos.lopez@gmail.com");

        expect(() => new Correo(1, "Asunto", "Contenido", remitente, [destinatario1])).toThrowError("El correo debe tener un remitente");

});
})
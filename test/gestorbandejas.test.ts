import {Correo} from '../src/correo';
import {Contacto} from '../src/contacto';
import { describe, it, expect, beforeEach } from 'vitest';
import { GestorBandejas } from '../src/gestorbandejas';

describe("GestorBandejas", () => {
    beforeEach(() => {
        Correo.reiniciarContador();
    });

    it("debe enviar un correo y moverlo de la bandeja de borradores a la bandeja de enviados", () => {
        const remitente = new Contacto("Juan Pérez", "juan.perez@example.com");
        const destinatario = new Contacto("María García", "maria.garcia@example.com");
        const correo = new Correo("Asunto del correo", "Cuerpo del correo", remitente , [destinatario]);
        const gestorBandejas = new GestorBandejas();


        gestorBandejas.guardarBorrador(correo);
        gestorBandejas.enviarCorreo(correo);

        expect(gestorBandejas.bandejaEnviados).toContain(correo);
        expect(gestorBandejas.bandejaBorrador).not.toContain(correo);
    });
    it("no debe enviar un correo sin asunto o sin destinatarios", () => {
        const remitente = new Contacto("Juan Pérez", "juan.perez@example.com");
        const destinatario = new Contacto("María García", "maria.garcia@example.com");
        const sinAsunto = new Correo("", "Cuerpo", remitente, [destinatario]);
        const sinDestinatarios = new Correo("Asunto", "Cuerpo", remitente, []);
        const gestorBandejas = new GestorBandejas();

        expect(() => gestorBandejas.enviarCorreo(sinAsunto)).toThrow();
        expect(() => gestorBandejas.enviarCorreo(sinDestinatarios)).toThrow();
        expect(gestorBandejas.bandejaEnviados.length).toBe(0);
    });
    it("debe dar error al intentar enviar un correo ya enviado", () => {
        const remitente = new Contacto("Juan Pérez", "juan.perez@example.com");
        const destinatario = new Contacto("María García", "maria.garcia@example.com");
        const correo = new Correo("Asunto del correo", "Cuerpo del correo", remitente, [destinatario]);
        const gestorBandejas = new GestorBandejas();

        gestorBandejas.guardarBorrador(correo);
        gestorBandejas.enviarCorreo(correo);

        expect(() => gestorBandejas.enviarCorreo(correo)).toThrow(Error);
    });
    it("debe dar error al intentar guardar un correo ya en borradores", () => {
        const remitente = new Contacto("Juan Pérez", "juan.perez@example.com");
        const destinatario = new Contacto("María García", "maria.garcia@example.com");
        const correo = new Correo("Asunto del correo", "Cuerpo del correo", remitente, [destinatario]);
        const gestorBandejas = new GestorBandejas();

        gestorBandejas.guardarBorrador(correo);

        expect(() => gestorBandejas.guardarBorrador(correo)).toThrow(Error);
    });
});
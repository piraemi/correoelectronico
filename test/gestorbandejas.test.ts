import {Correo} from '../src/correo';
import {Contacto} from '../src/contacto';
import { describe, it, expect } from 'vitest';
import { GestorBandejas } from '../src/gestorbandejas';

describe("GestorBandejas", () => {
    it("debe enviar un correo y moverlo de la bandeja de borradores a la bandeja de enviados", () => {
        const remitente = new Contacto("Juan Pérez", "juan.perez@example.com");
        const destinatario = new Contacto("María García", "maria.garcia@example.com");
        const correo = new Correo("Asunto del correo", "Cuerpo del correo", remitente , [destinatario]);
        const gestorBandejas = new GestorBandejas();

        gestorBandejas.enviarCorreo(correo);

        expect(gestorBandejas.bandejaEnviados).toContain(correo);
        expect(gestorBandejas.bandejaBorrador).not.toContain(correo);
    });
});
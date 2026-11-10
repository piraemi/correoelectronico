import {Correo} from '../src/correo';
import {Contacto} from '../src/contacto';
import { describe, it, expect, beforeEach } from 'vitest';
import { BandejaEnviados, BandejaBorradores, BandejaRecibidos } from '../src/bandejas';


describe("GestorBandejas y clases hijas", () => {
    let remitente: Contacto;
    let destinatario1: Contacto;
    let destinatario2: Contacto;
    let correo: Correo;

    beforeEach(() => {
        Correo.reiniciarContador();
        remitente = new Contacto("Remitente", "remitente@example.com");
        destinatario1 = new Contacto("Destinatario 1", "destinatario1@example.com");
        destinatario2 = new Contacto("Destinatario 2", "destinatario2@example.com");
        correo = new Correo("Asunto de prueba", "Cuerpo del correo", remitente, [destinatario1, destinatario2]);
    });

    it("debe agregar un correo al arreglo encapsulado", () => {
        const borradores = new BandejaBorradores();
        borradores.agregarCorreo(correo);
        expect(borradores.correos).toContain(correo);
        expect(borradores.correos.length).toBe(1);
    });

    it("debe verificar la existencia de un correo por ID", () => {
        const enviados = new BandejaEnviados();
        enviados.agregarCorreo(correo);
        expect(enviados.existeCorreoPorID(correo.ID)).toBe(true);
        expect(enviados.existeCorreoPorID(999)).toBe(false);
    });

    it("debe eliminar un correo por ID", () => {
        const recibidos = new BandejaRecibidos();
        recibidos.agregarCorreo(correo);
        expect(recibidos.correos.length).toBe(1);
        recibidos.eliminarCorreoPorID(correo.ID);
        expect(recibidos.correos.length).toBe(0);
    });
    it ("no debe alterar el arreglo si se intenta eliminar un correo que no existe", () => {
        const recibidos = new BandejaRecibidos();
        recibidos.agregarCorreo(correo);
        expect(recibidos.correos.length).toBe(1);
        recibidos.eliminarCorreoPorID(999);
        expect(recibidos.correos.length).toBe(1);
    });
});
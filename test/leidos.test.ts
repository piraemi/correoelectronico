import { describe, it, expect, beforeEach } from 'vitest';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';
import { BandejaRecibidos } from '../src/bandejas';
import { Filtro } from '../src/filtro';
import { noLeido } from '../src/predicados';

describe("Leídos y no leídos", () => {
    let correo1: Correo;
    let correo2: Correo;
    let recibidos: BandejaRecibidos;

    beforeEach(() => {
        const ana = new Contacto("Ana Pérez", "ana@gmail.com");
        const juan = new Contacto("Juan Gómez", "juan@hotmail.com");
        correo1 = new Correo(1, "Hola", "Cómo estás", ana, [juan]);
        correo2 = new Correo(2, "Chau", "Nos vemos", juan, [ana]);
        recibidos = new BandejaRecibidos();
        recibidos.agregarCorreo(correo1);
        recibidos.agregarCorreo(correo2);
    });

    it("debe marcar un correo como leído y otra vez como no leído", () => {
        correo1.leido = true;
        expect(correo1.leido).toBe(true);

        correo1.leido = false;
        expect(correo1.leido).toBe(false);
    });

    it("debe obtener los correos no leídos de una bandeja", () => {
        correo1.leido = true;
        expect(recibidos.noLeidos).toEqual([correo2]);
    });

    it("el cambio de estado debe verse enseguida en un filtro", () => {
        const filtroNoLeidos = new Filtro("No leídos", noLeido);
        expect(filtroNoLeidos.aplicar(recibidos.correos)).toEqual([correo1, correo2]);

        correo2.leido = true;
        expect(filtroNoLeidos.aplicar(recibidos.correos)).toEqual([correo1]);
    });
});
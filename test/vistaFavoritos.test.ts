import { describe, it, expect, beforeEach } from 'vitest';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';
import { BandejaRecibidos, BandejaEnviados, BandejaEliminados } from '../src/bandejas';
import { VistaFavoritos } from '../src/vistaFavoritos';
import { Filtro } from '../src/filtro';
import { asuntoContiene } from '../src/predicados';

describe("Favoritos", () => {
    let correo1: Correo;
    let correo2: Correo;
    let correo3: Correo;
    let recibidos: BandejaRecibidos;
    let enviados: BandejaEnviados;
    let eliminados: BandejaEliminados;

    beforeEach(() => {
        const ana = new Contacto("Ana Pérez", "ana@gmail.com");
        const juan = new Contacto("Juan Gómez", "juan@hotmail.com");
        correo1 = new Correo(1, "Hola", "Cómo estás", ana, [juan]);
        correo2 = new Correo(2, "Chau", "Nos vemos", juan, [ana]);
        correo3 = new Correo(3, "Reunión", "Mañana", ana, [juan]);
        recibidos = new BandejaRecibidos();
        enviados = new BandejaEnviados();
        eliminados = new BandejaEliminados();
        recibidos.agregarCorreo(correo1);
        enviados.agregarCorreo(correo2);
        eliminados.agregarCorreo(correo3);
    });

    it("debe marcar y desmarcar un correo como favorito sin moverlo de su bandeja", () => {
        correo1.favorito = true;
        expect(correo1.favorito).toBe(true);
        expect(recibidos.correos).toContain(correo1);

        correo1.favorito = false;
        expect(correo1.favorito).toBe(false);
    });

    it("debe obtener los favoritos de todas las bandejas", () => {
        correo1.favorito = true;
        correo2.favorito = true;

        expect(VistaFavoritos.obtener([recibidos, enviados])).toEqual([correo1, correo2]);
    });

    it("no debe repetir un favorito que está en dos bandejas", () => {
        correo1.favorito = true;
        enviados.agregarCorreo(correo1);

        expect(VistaFavoritos.obtener([recibidos, enviados])).toEqual([correo1]);
    });

    it("no debe mostrar favoritos que están en Eliminados", () => {
        correo3.favorito = true;

        expect(VistaFavoritos.obtener([recibidos, enviados, eliminados])).toEqual([]);
        expect(correo3.favorito).toBe(true);
    });

    it("debe poder aplicar un filtro sobre los favoritos", () => {
        correo1.favorito = true;
        correo2.favorito = true;
        const filtroHola = new Filtro("Hola", asuntoContiene("hola"));

        const favoritos = VistaFavoritos.obtener([recibidos, enviados]);
        expect(filtroHola.aplicar(favoritos)).toEqual([correo1]);
    });
});
import {Contacto} from '../src/contacto';
import { describe, it, expect } from 'vitest';

describe("Contacto", () => {
    it("debe crear un contacto con nombre y correo válidos", () => {
        const contacto = new Contacto("Ana Pérez", "ana@gmail.com");
        expect(contacto.nombreCompleto).toBe("Ana Pérez");
        expect(contacto.email).toBe("ana@gmail.com");
    });
    it("debe lanzar error al crear un contacto con correo inválido", () => {
        expect(() => new Contacto("Juan Gómez", "juanhotmail.com")).toThrowError('El email "juanhotmail.com" no tiene un formato válido');
    });
});

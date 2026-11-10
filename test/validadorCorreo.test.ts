import { describe, it, expect } from 'vitest';
import { ValidadorCorreo } from '../src/validadorCorreo';
import { Contacto } from '../src/contacto';
import { Correo } from '../src/correo';

describe("ValidadorCorreo", () => {
  it("debe validar correctamente un correo con todos sus datos válidos", () => {
    const remitente = new Contacto("Juan", "juan@test.com");
    const destinatario = new Contacto("Maria", "maria@test.com");
    
    const correoValido = {
      asunto: "Proyecto de TypeScript",
      destinatarios: [destinatario],
      remitente: remitente
    } as Correo;

    expect(() => {
      ValidadorCorreo.validarCorreo(correoValido);
    }).not.toThrow();
  });
});
import { describe, it, expect, beforeEach } from 'vitest';
import { EnviadorCorreo } from '../src/enviadorCorreo';
import { BandejaEnviados, BandejaBorradores } from '../src/bandejas';
import { Correo } from '../src/correo';
import { Contacto } from '../src/contacto';

describe("EnviadorCorreos", () => {
  let remitente: Contacto;
  let destinatario1: Contacto;
  let destinatario2: Contacto;
  let correo: Correo;
  let enviados: BandejaEnviados;
  let borradores: BandejaBorradores;
  let enviador: EnviadorCorreo;

  beforeEach(() => {
    Correo.reiniciarContador();
    
    remitente = new Contacto("Juan", "juan@test.com");
    destinatario1 = new Contacto("María", "maria@test.com");
    destinatario2 = new Contacto("Pedro", "pedro@test.com");
    
    correo = new Correo("Proyecto TS", "Cuerpo del mensaje", remitente, [destinatario1, destinatario2]);
    
    enviados = new BandejaEnviados();
    borradores = new BandejaBorradores();
    enviador = new EnviadorCorreo(enviados, borradores);
  });

  it("debe mover el correo de borradores a enviados", () => {
    borradores.agregarCorreo(correo);

    enviador.enviarCorreo(correo);


    expect(enviados.correos).toContain(correo);
    expect(borradores.correos).not.toContain(correo);
  });

  it("debe enrutar el correo a las bandejas de recibidos de todos los destinatarios", () => {
    enviador.enviarCorreo(correo);
    const bandejaRecibidosDestinatario1 = enviador['_mapaRecibidos'].get(destinatario1.email);
    const bandejaRecibidosDestinatario2 = enviador['_mapaRecibidos'].get(destinatario2.email);
    
    expect(bandejaRecibidosDestinatario1?.correos).toContain(correo);
    expect(bandejaRecibidosDestinatario2?.correos).toContain(correo);

  });

  it("debe bloquear el envío y lanzar un error si el correo ya existe en la bandeja de enviados", () => {
    enviador.enviarCorreo(correo);

    expect(() => enviador.enviarCorreo(correo)).toThrowError(`El correo con ID ${correo.ID} ya ha sido enviado`);
});
})
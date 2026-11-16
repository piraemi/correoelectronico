import { GestorBandejas } from "./gestorbandejas";
import { Contacto } from "./contacto";

export class BandejaEnviados extends GestorBandejas {}

export class BandejaRecibidos extends GestorBandejas {}

export class BandejaBorradores extends GestorBandejas {
    public editarBorrador(
    id: number, 
    cambios: { asunto?: string; contenido?: string; destinatarios?: Contacto[] }
  ): void {
    const borrador = this.obtenerPorID(id);
    if (!borrador) {
      throw new Error(`No se encontró un borrador con el ID ${id}`);
    }

    if (cambios.asunto !== undefined) borrador.asunto = cambios.asunto;
    if (cambios.contenido !== undefined) borrador.contenido = cambios.contenido;
    if (cambios.destinatarios !== undefined) borrador.destinatarios = cambios.destinatarios;
}
}

export class BandejaEliminados extends GestorBandejas {}
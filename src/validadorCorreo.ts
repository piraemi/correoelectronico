import { Correo } from "./correo";
import { Contacto } from "./contacto";
import { ok } from 'node:assert';

export class ValidadorCorreo {
    public static validarCorreo(correo: Correo): void {
        ok(correo.asunto.trim() !== "", "El correo debe tener asunto");
        ok(correo.destinatarios.length > 0, "El correo debe tener al menos un destinatario");
        ok(correo.remitente instanceof Contacto, "El correo debe tener un remitente válido");
    }
}


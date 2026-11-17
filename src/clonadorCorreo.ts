import { Correo } from "./correo";

export class ClonadorCorreo {
    public static clonar(correo: Correo): Correo {
        return new Correo(
            correo.ID,
            correo.asunto,
            correo.contenido,
            correo.remitente,
            correo.destinatarios
        );
    }
}
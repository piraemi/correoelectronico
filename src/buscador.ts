import { Correo } from './correo';
import { Contacto } from './contacto';

export class Buscador {
    public static buscar(correos: Correo[], texto: string): Correo[] {
        const buscado = texto.toLowerCase();
        return correos.filter(c => Buscador.coincide(c, buscado));
    }

    private static coincide(correo: Correo, buscado: string): boolean {
        const campos = [
            correo.asunto,
            correo.contenido,
            ...Buscador.datosDe(correo.remitente),
            ...correo.destinatarios.flatMap(d => Buscador.datosDe(d)),
        ];
        return campos.some(campo => campo.toLowerCase().includes(buscado));
    }

    private static datosDe(contacto: Contacto): string[] {
        return [contacto.nombreCompleto, contacto.email];
    }
}